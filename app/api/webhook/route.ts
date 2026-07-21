import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { resend, ORDER_FROM_EMAIL } from "@/lib/resend";
import { createCjOrder } from "@/lib/cj";
import { getProductBySlug } from "@/data/products";

export const runtime = "nodejs";

// Configure cette URL dans le dashboard Stripe (Développeurs > Webhooks) :
// https://ton-domaine.example/api/webhook
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook non configuré." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Signature webhook invalide:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Nouvelle commande payée :", session.id, session.customer_details?.email);

      // TODO: enregistre la commande en base de données (pas de DB branchée
      // pour l'instant sur ce projet).

      await sendOrderConfirmationEmail(session);
      await triggerSupplierOrder(session);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function sendOrderConfirmationEmail(session: Stripe.Checkout.Session) {
  const to = session.customer_details?.email;
  if (!to) return;

  if (!resend) {
    console.log(
      "RESEND_API_KEY non configuré : e-mail de confirmation ignoré pour",
      session.id
    );
    return;
  }

  const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  const items = sessionWithItems.line_items?.data ?? [];
  const itemsHtml = items
    .map((item) => {
      const name = item.description ?? "Article";
      const amount = ((item.amount_total ?? 0) / 100).toFixed(2);
      return `<tr><td>${name} × ${item.quantity}</td><td style="text-align:right">${amount} €</td></tr>`;
    })
    .join("");

  const total = ((session.amount_total ?? 0) / 100).toFixed(2);

  try {
    await resend.emails.send({
      from: ORDER_FROM_EMAIL,
      to,
      subject: "Confirmation de ta commande Somnia",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color:#111830;">Merci pour ta commande !</h1>
          <p>Elle sera expédiée sous 24 à 48h.</p>
          <table style="width:100%; border-collapse: collapse;">
            ${itemsHtml}
            <tr><td style="font-weight:bold; padding-top:8px;">Total</td><td style="text-align:right; font-weight:bold; padding-top:8px;">${total} €</td></tr>
          </table>
        </div>
      `,
    });
  } catch (err) {
    console.error("Échec de l'envoi de l'e-mail de confirmation:", err);
  }
}

async function triggerSupplierOrder(session: Stripe.Checkout.Session) {
  if (!process.env.CJ_API_KEY) {
    console.log("CJ_API_KEY non configuré : commande fournisseur non déclenchée pour", session.id);
    return;
  }

  const shipping = session.collected_information?.shipping_details;
  if (!shipping) {
    console.error("Pas d'adresse de livraison sur la session, commande CJ impossible:", session.id);
    return;
  }

  const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product"],
  });
  const lineItems = sessionWithItems.line_items?.data ?? [];

  const products = [];
  for (const item of lineItems) {
    const stripeProduct = item.price?.product;
    const slug =
      typeof stripeProduct === "object" && stripeProduct && "metadata" in stripeProduct
        ? stripeProduct.metadata?.slug
        : undefined;
    const catalogProduct = slug ? getProductBySlug(slug) : undefined;

    if (!catalogProduct?.cjSku) {
      console.warn(
        `Pas de cjSku mappé pour "${slug ?? item.description}" — commande CJ non déclenchée automatiquement pour la session ${session.id}. Complète data/products.ts une fois le produit choisi sur CJ Dropshipping, ou passe cette commande manuellement.`
      );
      return;
    }

    products.push({
      sku: catalogProduct.cjSku,
      quantity: item.quantity ?? 1,
      storeLineItemId: item.id,
    });
  }

  if (products.length === 0) return;

  const result = await createCjOrder({
    orderNumber: session.id.replace(/^cs_(test_|live_)?/, "").slice(0, 45),
    shipping: {
      name: shipping.name,
      line1: shipping.address.line1 ?? "",
      line2: shipping.address.line2,
      city: shipping.address.city ?? "",
      state: shipping.address.state,
      postal_code: shipping.address.postal_code,
      country: shipping.address.country ?? "",
      phone: session.customer_details?.phone,
      email: session.customer_details?.email,
    },
    products,
  });

  if (!result.ok) {
    console.error("Échec de la création de la commande CJ Dropshipping:", result.message);
  } else {
    console.log(result.message);
  }
}
