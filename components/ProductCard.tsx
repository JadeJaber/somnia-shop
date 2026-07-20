import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produit/${product.slug}`} className="card group block">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-night-800">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-moon px-3 py-1 text-xs font-bold text-night-950">
            {product.badge}
          </span>
        )}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{product.tagline}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-xl font-bold text-moon">
          {product.price.toFixed(2)} €
        </span>
        {product.compareAtPrice && (
          <span className="text-sm text-slate-500 line-through">
            {product.compareAtPrice.toFixed(2)} €
          </span>
        )}
      </div>
    </Link>
  );
}
