import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-night-800">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          {product.badge && (
            <span className="mb-3 inline-block rounded-full bg-moon px-3 py-1 text-xs font-bold text-night-950">
              {product.badge}
            </span>
          )}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-slate-400">{product.tagline}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-moon">
              {product.price.toFixed(2)} €
            </span>
            {product.compareAtPrice && (
              <span className="text-slate-500 line-through">
                {product.compareAtPrice.toFixed(2)} €
              </span>
            )}
          </div>

          <p className="mt-6 text-slate-300">{product.longDescription}</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-300">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-moon">✓</span> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            {product.stock} en stock · Expédition sous 24-48h
          </p>
        </div>
      </div>
    </div>
  );
}
