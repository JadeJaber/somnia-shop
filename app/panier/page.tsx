"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Impossible de créer la session de paiement.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Ton panier est vide</h1>
        <p className="mt-2 text-slate-400">
          Découvre notre collection pour commencer.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">Ton panier</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.slug} className="card flex gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-night-800">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-slate-400">{item.price.toFixed(2)} €</p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  className="rounded border border-slate-700 px-3"
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="rounded border border-slate-700 px-3"
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="ml-auto text-sm text-slate-500 underline"
                  onClick={() => removeItem(item.slug)}
                >
                  Retirer
                </button>
              </div>
            </div>
            <p className="font-semibold">
              {(item.price * item.quantity).toFixed(2)} €
            </p>
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <div className="mb-4 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? "Redirection vers le paiement..." : "Payer avec Stripe"}
        </button>
      </div>
    </div>
  );
}
