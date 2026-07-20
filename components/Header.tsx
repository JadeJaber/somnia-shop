"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-night-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-moon">☾</span> Somnia
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
          <Link href="/" className="hover:text-moon">
            Boutique
          </Link>
          <Link href="/#avis" className="hover:text-moon">
            Avis
          </Link>
          <Link href="/#faq" className="hover:text-moon">
            FAQ
          </Link>
        </nav>

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold hover:border-moon"
        >
          Panier
          {totalItems > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-moon text-xs font-bold text-night-950">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
