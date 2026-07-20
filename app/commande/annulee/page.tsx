import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-6 text-3xl font-bold">Paiement annulé</h1>
      <p className="mt-4 text-slate-400">
        Ta commande n&apos;a pas été finalisée. Ton panier est toujours
        disponible si tu veux réessayer.
      </p>
      <Link href="/panier" className="btn-primary mt-8 inline-flex">
        Retour au panier
      </Link>
    </div>
  );
}
