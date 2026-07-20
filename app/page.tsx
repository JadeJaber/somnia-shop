import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="mb-4 inline-block rounded-full border border-moon/40 px-4 py-1 text-sm text-moon">
          Sleepmaxing — la tendance bien-être 2026
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Dors mieux. Récupère plus vite. Réveille-toi vraiment reposé.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-slate-400">
          Nos masques de sommeil nouvelle génération combinent occultation
          totale, thermothérapie et audio pour transformer tes nuits.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="#produits" className="btn-primary">
            Découvrir la collection
          </Link>
        </div>
      </section>

      <section id="produits" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-8 text-2xl font-bold">Notre collection</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section id="avis" className="border-t border-slate-800 bg-night-900">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-bold">Ce qu&apos;en disent nos client·e·s</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Claire, 34 ans",
                text: "Le masque chauffant a changé mes nuits, je m'endors en 10 minutes.",
              },
              {
                name: "Thomas, 28 ans",
                text: "Le masque audio Bluetooth est bluffant, aucune gêne pour dormir sur le côté.",
              },
              {
                name: "Nadia, 41 ans",
                text: "Occultation parfaite, je le recommande pour les insomnies liées à la lumière.",
              },
            ].map((r) => (
              <div key={r.name} className="card">
                <p className="mb-3 text-moon">★★★★★</p>
                <p className="text-slate-300">&quot;{r.text}&quot;</p>
                <p className="mt-4 text-sm text-slate-500">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold">Questions fréquentes</h2>
        <div className="space-y-6">
          {[
            {
              q: "Quels sont les délais de livraison ?",
              a: "3 à 5 jours ouvrés en France métropolitaine, 5 à 10 jours pour l'international.",
            },
            {
              q: "Puis-je retourner un produit ?",
              a: "Oui, tu disposes de 30 jours pour retourner un produit non utilisé.",
            },
            {
              q: "Le paiement est-il sécurisé ?",
              a: "Tous les paiements sont traités par Stripe, aucune donnée bancaire ne transite par nos serveurs.",
            },
          ].map((item) => (
            <div key={item.q} className="card">
              <p className="font-semibold">{item.q}</p>
              <p className="mt-2 text-slate-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
