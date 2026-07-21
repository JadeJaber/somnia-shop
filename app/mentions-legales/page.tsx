import LegalTodo from "@/components/LegalTodo";

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Mentions légales</h1>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Éditeur du site</h2>
        <p>
          Le site somnia.com est édité par <LegalTodo>raison sociale ou nom / prénom</LegalTodo>,{" "}
          <LegalTodo>forme juridique (ex : entreprise individuelle, SASU...)</LegalTodo>
          {" "}immatriculée sous le numéro SIRET <LegalTodo>numéro SIRET</LegalTodo>, dont le
          siège social est situé <LegalTodo>adresse complète</LegalTodo>.
        </p>
        <p>
          Numéro de TVA intracommunautaire : <LegalTodo>numéro de TVA, si applicable</LegalTodo>
        </p>
        <p>
          Directeur de la publication : <LegalTodo>nom du responsable</LegalTodo>
        </p>
        <p>
          Contact : <LegalTodo>e-mail de contact</LegalTodo> — <LegalTodo>téléphone (optionnel)</LegalTodo>
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
          91789, États-Unis — https://vercel.com
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, images,
          logos, structure) est protégé par le droit d&apos;auteur. Toute
          reproduction, même partielle, est soumise à autorisation préalable.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-slate-300">
        <h2 className="text-xl font-semibold text-slate-100">Données personnelles</h2>
        <p>
          Le traitement des données personnelles est détaillé dans notre{" "}
          <a href="/politique-de-confidentialite" className="text-moon underline">
            politique de confidentialité
          </a>
          .
        </p>
      </section>
    </div>
  );
}
