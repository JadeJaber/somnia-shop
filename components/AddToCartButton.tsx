"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-full border border-slate-700">
        <button
          className="px-4 py-2 text-lg"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Diminuer la quantité"
        >
          −
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          className="px-4 py-2 text-lg"
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Augmenter la quantité"
        >
          +
        </button>
      </div>
      <button
        className="btn-primary flex-1"
        onClick={() => addItem(product, quantity)}
      >
        Ajouter au panier — {(product.price * quantity).toFixed(2)} €
      </button>
    </div>
  );
}
