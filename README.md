# Somnia — Boutique en ligne (masques de sommeil)

Site marchand complet sur la niche tendance "sleepmaxing" (accessoires de
sommeil intelligents). Stack : Next.js 14 (App Router) + TypeScript +
Tailwind CSS + Stripe Checkout.

## Fonctionnalités

- Catalogue produit (3 variantes de masques de sommeil, modifiable dans `data/products.ts`)
- Fiche produit avec sélection de quantité
- Panier persistant (localStorage) avec tiroir latéral et page dédiée
- Paiement sécurisé via Stripe Checkout (redirection hébergée par Stripe)
- Frais de port configurables (livraison standard payante / gratuite)
- Webhook Stripe pour traiter les commandes payées (branchement e-mail / fournisseur à faire)
- Design responsive, thème sombre "nuit"

## Démarrage rapide

```bash
cd somnia-shop
npm install
cp .env.example .env.local
```

Renseigne dans `.env.local` :
- `STRIPE_SECRET_KEY` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (clés de test depuis https://dashboard.stripe.com/test/apikeys)
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

Puis lance le serveur de développement :

```bash
npm run dev
```

Le site est disponible sur http://localhost:3000.

## Tester les paiements

Utilise une carte de test Stripe : `4242 4242 4242 4242`, date future, CVC quelconque.

Pour tester le webhook en local, installe la [Stripe CLI](https://docs.stripe.com/stripe-cli) puis :

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copie le secret affiché (`whsec_...`) dans `STRIPE_WEBHOOK_SECRET`.

## Déploiement (Vercel recommandé)

1. Pousse le dossier `somnia-shop` sur un dépôt GitHub.
2. Importe le repo sur https://vercel.com/new.
3. Ajoute les variables d'environnement (clés Stripe **live**, `NEXT_PUBLIC_SITE_URL` = ton domaine).
4. Dans le dashboard Stripe (mode live), crée un endpoint webhook pointant vers `https://ton-domaine/api/webhook`, événement `checkout.session.completed`.

## Prochaines étapes suggérées

- Remplacer les images placeholders par de vraies photos produit (fournies par ton fournisseur ou une séance photo)
- Brancher un service d'e-mail transactionnel (Resend, Postmark) dans le webhook pour la confirmation de commande
- Ajouter la génération automatique de commande fournisseur (ex. API CJ Dropshipping) dans le webhook
- Ajouter une page mentions légales / CGV (obligatoire en France pour la vente en ligne)
- Ajouter un pixel Meta/TikTok pour le tracking publicitaire si tu comptes faire de la pub

## Aspects légaux (France) — à ne pas oublier

- Mentions légales et CGV obligatoires (SIRET si tu es en société/auto-entreprise)
- Droit de rétractation de 14 jours (e-commerce UE)
- RGPD : bandeau cookies + politique de confidentialité si tu utilises des pixels de tracking
- Ceci n'est pas un conseil juridique — vérifie tes obligations avec un professionnel avant de lancer la vente.

Voir aussi `FOURNISSEURS.md` pour la liste des fournisseurs identifiés pour le produit.
