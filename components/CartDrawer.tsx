"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeCart}
        aria-hidden
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-night-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Ton panier</h2>
          <button onClick={closeCart} className="text-2xl leading-none">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-slate-400">Ton panier est vide pour le moment.</p>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto">
            {items.map((item) => (
              <div key={item.slug} className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-night-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-400">
                    {item.price.toFixed(2)} €
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className="rounded border border-slate-700 px-2"
                      onClick={() =>
                        updateQuantity(item.slug, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="rounded border border-slate-700 px-2"
                      onClick={() =>
                        updateQuantity(item.slug, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="ml-auto text-xs text-slate-500 underline"
                      onClick={() => removeItem(item.slug)}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 border-t border-slate-800 pt-4">
          <div className="mb-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
          <Link
            href="/panier"
            onClick={closeCart}
            className="btn-primary block w-full"
          >
            Voir le panier &amp; payer
          </Link>
        </div>
      </div>
    </div>
  );
}
