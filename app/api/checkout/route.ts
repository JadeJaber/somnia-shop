import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";
import { CartItem } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide." }, { status: 400 });
    }

    // Sécurité : on ne fait jamais confiance au prix envoyé par le client.
    // On revalide chaque article contre le catalogue serveur.
    const line_items = items.map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) {
        throw new Error(`Produit inconnu : ${item.slug}`);
      }
      return {
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            images: [product.images[0]],
          },
        },
      };
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const randomSuffix = Array.from({ length: 8 }, () =>
      "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]
    ).join("");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      integration_identifier: `somnia-checkout-${randomSuffix}`,
      line_items,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "GB", "US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 490, currency: "eur" },
            display_name: "Livraison standard (3-5 jours)",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "eur" },
            display_name: "Livraison offerte (5-10 jours)",
          },
        },
      ],
      success_url: `${siteUrl}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/commande/annulee`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur checkout Stripe:", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
