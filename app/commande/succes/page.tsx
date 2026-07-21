"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart, hydrated } = useCart();

  useEffect(() => {
    if (hydrated) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-5xl">🎉</p>
      <h1 className="mt-6 text-3xl font-bold">Merci pour ta commande !</h1>
      <p className="mt-4 text-slate-400">
        Un e-mail de confirmation vient de t&apos;être envoyé. Ta commande
        sera expédiée sous 24 à 48h.
      </p>
      <Link href="/" className="btn-primary mt-8 inline-flex">
        Retour à la boutique
      </Link>
    </div>
  );
}
