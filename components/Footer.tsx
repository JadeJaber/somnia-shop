import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-night-950">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-400">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="mb-2 text-lg font-bold text-slate-100">☾ Somnia</p>
            <p>
              Accessoires de sommeil pensés pour t&apos;endormir plus vite et
              mieux récupérer.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-slate-200">Informations</p>
            <ul className="space-y-1">
              <li>
                <Link href="/mentions-legales" className="hover:text-slate-200">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-slate-200">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="hover:text-slate-200">
                  Politique de confidentialité
                </Link>
              </li>
              <li>Contact : contact@somnia.com</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-slate-200">Paiement sécurisé</p>
            <p>Paiement par carte via Stripe. Données jamais stockées sur nos serveurs.</p>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-600">
          © {new Date().getFullYear()} Somnia. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
