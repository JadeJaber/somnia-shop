import LegalTodo from "@/components/LegalTodo";

export default function CgvPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Conditions générales de vente</h1>
      <p className="mt-2 text-sm text-slate-500">
        Dernière mise à jour : <LegalTodo>date</LegalTodo>
      </p>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">1. Objet</h2>
        <p>
          Les présentes conditions générales de vente régissent les ventes de
          produits réalisées sur le site somnia.com par{" "}
          <LegalTodo>raison sociale ou nom / prénom</LegalTodo>.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">2. Prix</h2>
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises (TTC). Somnia
          se réserve le droit de modifier ses prix à tout moment, les produits
          étant facturés sur la base des tarifs en vigueur au moment de la
          validation de la commande.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">3. Commande et paiement</h2>
        <p>
          La commande est finalisée via Stripe Checkout. Le paiement est
          exigible immédiatement à la commande. Somnia ne stocke aucune donnée
          bancaire ; celles-ci sont traitées directement par Stripe, prestataire
          de paiement certifié PCI-DSS.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">4. Livraison</h2>
        <p>
          Les produits sont expédiés sous 24 à 48h ouvrées après confirmation
          du paiement, vers les zones géographiques proposées lors de la
          commande. Les délais de livraison estimés sont communiqués à titre
          indicatif et peuvent varier selon le transporteur (
          <LegalTodo>nom du/des transporteur(s) utilisé(s)</LegalTodo>).
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">5. Droit de rétractation</h2>
        <p>
          Conformément aux articles L221-18 et suivants du Code de la
          consommation, le client dispose d&apos;un délai de 14 jours à
          compter de la réception du produit pour exercer son droit de
          rétractation, sans avoir à justifier de motif. Les frais de retour
          sont à la charge du client, sauf disposition contraire.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">6. Garanties légales</h2>
        <p>
          Tous les produits vendus bénéficient de la garantie légale de
          conformité (articles L217-3 et suivants du Code de la consommation)
          et de la garantie contre les vices cachés (articles 1641 et suivants
          du Code civil).
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">7. Données personnelles</h2>
        <p>
          Le traitement des données personnelles est détaillé dans notre{" "}
          <a href="/politique-de-confidentialite" className="text-moon underline">
            politique de confidentialité
          </a>
          .
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">8. Litiges et médiation</h2>
        <p>
          En cas de litige, le client peut recourir gratuitement au médiateur
          de la consommation : <LegalTodo>nom et coordonnées du médiateur</LegalTodo>.
          Les présentes CGV sont soumises au droit français.
        </p>
      </section>
    </div>
  );
}
