import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY manquant : configure tes variables d'environnement (.env.local en dev, variables Vercel en prod)."
  );
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2026-06-24.dahlia",
});
