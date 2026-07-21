import LegalTodo from "@/components/LegalTodo";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
      <p className="mt-2 text-sm text-slate-500">
        Dernière mise à jour : <LegalTodo>date</LegalTodo>
      </p>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Responsable du traitement</h2>
        <p>
          <LegalTodo>raison sociale ou nom / prénom</LegalTodo>, contact :{" "}
          <LegalTodo>e-mail de contact</LegalTodo>.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Données collectées</h2>
        <p>
          Lors d&apos;une commande, sont collectés : nom, e-mail et adresse de
          livraison, saisis directement via Stripe Checkout. Somnia ne
          conserve pas ces informations dans une base de données propre à ce
          jour ; elles transitent uniquement chez les sous-traitants listés
          ci-dessous pour permettre le traitement de la commande.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Finalités du traitement</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Traitement et paiement de la commande</li>
          <li>Envoi de l&apos;e-mail de confirmation de commande</li>
          <li>Expédition du produit par le fournisseur</li>
        </ul>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Sous-traitants</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Stripe (paiement) — https://stripe.com/fr/privacy</li>
          <li>Resend (envoi de l&apos;e-mail de confirmation) — https://resend.com/legal/privacy-policy</li>
          <li>CJ Dropshipping (expédition du produit) — https://cjdropshipping.com/privacy-policy.html</li>
          <li>Vercel (hébergement du site) — https://vercel.com/legal/privacy-policy</li>
        </ul>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Cookies</h2>
        <p>
          Ce site n&apos;utilise actuellement aucun cookie de mesure d&apos;audience
          ou de publicité. Le contenu du panier est conservé dans le stockage
          local de ton navigateur (localStorage), une technologie strictement
          nécessaire au fonctionnement du site et non soumise au consentement.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Tes droits</h2>
        <p>
          Conformément au RGPD, tu disposes d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, d&apos;opposition et de portabilité
          sur tes données personnelles. Pour l&apos;exercer, contacte{" "}
          <LegalTodo>e-mail de contact</LegalTodo>. Tu peux également introduire
          une réclamation auprès de la CNIL (www.cnil.fr).
        </p>
      </section>
    </div>
  );
}
