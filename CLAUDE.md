# Somnia — contexte du projet (à lire par Claude Code)

Ce fichier résume tout ce qui a été fait sur ce projet dans une session
Cowork précédente, pour que la continuité soit assurée en reprenant le
projet dans Claude Code.

## Demande initiale

Jade voulait : "générer tout le code nécessaire d'un site marchand vendant
un produit de niche tendance" + "trouver les fournisseurs du produit à
vendre".

## Choix validés avec Jade (clarifications posées en amont)

- Produit : pas d'idée précise → recherche de tendance effectuée par Claude
- Modèle économique : pas sûr → conseil donné (voir plus bas)
- Stack technique : site codé sur-mesure (pas de Shopify/WordPress)
- Marché cible : France + international

## Niche retenue

**Sleepmaxing / accessoires de sommeil intelligents.** Recherche web menée
en juillet 2026 : niche tendance forte sur TikTok/Instagram, peu saturée,
marge nette estimée 38-55%, produit léger et facile à expédier à
l'international. Alternative envisagée mais écartée : bien-être animalier
(pet wellness), également tendance mais marché plus concurrentiel.

### Gamme produit choisie (3 variantes, dans `data/products.ts`)
1. Masque Blackout Confort — 24,90 € (soie, structure 3D anti-pression)
2. Masque Chauffant Lavande — 32,90 € (thermothérapie + aromathérapie, USB-C)
3. Masque Audio Bluetooth Sommeil — 39,90 € (haut-parleurs ultra-fins intégrés)

Ces prix/descriptions sont des points de départ — à ajuster une fois les
coûts fournisseurs réels connus (marge cible évoquée : viser 3-4x le coût
d'achat en dropshipping).

## Modèle économique — conseil donné à Jade

Recommandation : démarrer en **dropshipping** (pas de stock, capital de
départ faible) via CJ Dropshipping pour valider la demande, puis basculer
vers de l'**achat en gros / marque propre** via Alibaba une fois les
ventes régulières confirmées (marges bien meilleures mais capital et MOQ
plus élevés). Détail complet dans `FOURNISSEURS.md`.

## Fournisseurs identifiés (voir FOURNISSEURS.md pour le détail)

- **CJ Dropshipping** (recommandé pour démarrer) — sourcing + fulfillment, 7-15j
- **AliExpress** — le plus simple/rapide à tester, délais 15-30j
- **Doba** — orienté marché US
- **BigBuy** — grossiste basé en Europe (Espagne), livraison rapide FR/UE
- **Alibaba** — achat en gros / OEM marque propre, MOQ 100-500 unités

Point de vigilance signalé : certification CE obligatoire pour les
modèles chauffant/Bluetooth (composants électroniques + batterie lithium)
vendus en France/UE.

## Stack technique du site livré

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Stripe Checkout.
Voir `README.md` pour l'installation et le déploiement (Vercel recommandé).

Structure :
- `app/` — pages (accueil, fiche produit `[slug]`, panier, succès/annulation commande, routes API `checkout` et `webhook`)
- `components/` — Header, Footer, ProductCard, AddToCartButton, CartDrawer
- `context/CartContext.tsx` — état panier (persisté en localStorage)
- `data/products.ts` — catalogue produit (à éditer pour changer prix/descriptions/images)
- `lib/stripe.ts`, `lib/types.ts`, `lib/cart-storage.ts`

## État de la vérification

Le code a été relu manuellement (imports, types, cohérence des chemins) et
est cohérent. **`npm install` / `npm run build` n'ont PAS pu être exécutés**
dans l'environnement Cowork car le sandbox n'avait pas accès au registre
npm (bloqué par l'allowlist réseau). À faire en priorité dans Claude Code :

```bash
cd somnia-shop
npm install
npm run build
```

et corriger toute erreur de compilation qui apparaîtrait (peu probable vu
la relecture, mais non garanti sans exécution réelle).

## Étapes suivantes déjà évoquées avec Jade

- Remplacer les images placeholders Unsplash par de vraies photos produit
- Brancher un e-mail transactionnel (Resend/Postmark) dans `app/api/webhook/route.ts`
- Automatiser la commande fournisseur (API CJ Dropshipping) dans le webhook
- Ajouter mentions légales / CGV (obligatoire en France)
- RGPD (bandeau cookies) si pixels de tracking pub ajoutés
- Jade est sur Mac : instructions d'installation Node.js, VS Code, Stripe CLI,
  Git/GitHub + déploiement Vercel ont déjà été données dans la conversation
  précédente (Cowork). Les redonner si besoin plutôt que de supposer qu'elles
  ont été appliquées.

## Comment continuer

Claude Code peut directement travailler dans ce dossier (`somnia-shop/`).
Ce fichier `CLAUDE.md` est chargé automatiquement comme contexte. Prochaine
action logique : lancer `npm install && npm run build` pour valider le
projet, puis avancer sur les étapes suivantes ci-dessus selon la priorité
de Jade.
