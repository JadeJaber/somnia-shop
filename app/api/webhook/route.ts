import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

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
      // TODO: à ce stade, enregistre la commande en base de données,
      // envoie un e-mail de confirmation, et transmets la commande à ton
      // fournisseur (dropshipping) pour expédition.
      console.log("Nouvelle commande payée :", session.id, session.customer_details?.email);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
