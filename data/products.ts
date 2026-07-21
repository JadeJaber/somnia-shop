import { Product } from "@/lib/types";

// Catalogue de démarrage — remplace les images (placeholders Unsplash) et
// ajuste les prix selon tes coûts fournisseurs réels (voir FOURNISSEURS.md).
export const products: Product[] = [
  {
    slug: "masque-blackout-confort",
    name: "Masque Blackout Confort",
    tagline: "Occultation totale, zéro pression sur les yeux",
    description:
      "Masque de sommeil en soie avec inserts 3D qui laissent de l'espace pour cligner des yeux librement.",
    longDescription:
      "Le Masque Blackout Confort bloque 100% de la lumière grâce à sa structure 3D sans contact avec les paupières. Doublure douce effet soie, sangle ajustable en velcro silencieux, idéal pour les dormeurs sur le côté.",
    price: 24.9,
    compareAtPrice: 34.9,
    currency: "eur",
    images: ["/products/masque-blackout-confort.webp"],
    features: [
      "Occultation 100% de la lumière",
      "Structure 3D sans pression oculaire",
      "Doublure douce effet soie, hypoallergénique",
      "Sangle silencieuse ajustable",
    ],
    stock: 250,
    badge: "Best-seller",
    // CJ Dropshipping — "Long Sleep Shading... Artificial Silk Cold Soft Eye
    // Mask", fournisseur Premiumgoods (4.9/5, 133 boutiques revendeuses).
    // Matière réelle : rayon effet soie (pas de la vraie soie mûrier).
    cjSku: "CJYD198717801AZ",
  },
  {
    slug: "masque-chauffant-lavande",
    name: "Masque Chauffant Lavande",
    tagline: "Chaleur douce + massage pour t'endormir plus vite",
    description:
      "Masque chauffant et massant rechargeable, poche compatible sachet de lavande séchée pour l'aromathérapie.",
    longDescription:
      "Combine vibration massante et compresse chaude à température constante de 45°C pour réduire les tensions oculaires et favoriser l'endormissement. Batterie rechargeable intégrée. Glisse un sachet de lavande séchée (non inclus) dans la poche prévue si tu veux ajouter l'aromathérapie.",
    price: 32.9,
    compareAtPrice: 44.9,
    currency: "eur",
    images: ["/products/masque-chauffant-lavande.webp"],
    features: [
      "Chauffage constant 45°C + massage vibrant",
      "Poche compatible sachet de lavande",
      "Batterie rechargeable",
      "Retours & remboursement sous 30 jours",
    ],
    stock: 180,
    badge: "Nouveau",
    // CJ Dropshipping — "Eye Massage Hot Compress Eye Protection Eye Mask",
    // fournisseur Premiumgoods (4.9/5, 161 boutiques revendeuses).
    // Pas d'aromathérapie lavande fournie par le fournisseur : à ajouter
    // toi-même (sachets de lavande séchée sourcés séparément) si tu veux
    // tenir la promesse marketing, sinon adapte la fiche produit.
    cjSku: "CJJT202629601AZ",
  },
  {
    slug: "masque-audio-bluetooth",
    name: "Masque Audio Bluetooth Sommeil",
    tagline: "Sons blancs et musique de sommeil intégrés, sans écouteurs qui gênent",
    description:
      "Masque de sommeil avec haut-parleurs Bluetooth intégrés, 20 sons blancs et 4 musiques de sommeil préchargés, occultation totale.",
    longDescription:
      "Haut-parleurs stéréo intégrés dans un bandeau doux. Bluetooth 5.2, jusqu'à 15h d'autonomie en lecture (35h sans les sons blancs), micro intégré pour les appels et l'activation de l'assistant vocal, 20 sons blancs et 4 musiques de sommeil déjà présents dans l'appareil — pas besoin d'appli. Occultation 100% de la lumière.",
    price: 39.9,
    compareAtPrice: 54.9,
    currency: "eur",
    images: ["/products/masque-audio-bluetooth.webp"],
    features: [
      "Bluetooth 5.2, jusqu'à 15h d'autonomie",
      "20 sons blancs + 4 musiques de sommeil intégrés",
      "Micro intégré, activation assistant vocal",
      "Occultation 100% de la lumière",
    ],
    stock: 120,
    badge: "Tendance",
    // CJ Dropshipping — "White Noise Bluetooth Sleep Eye Mask", fournisseur
    // Yiwu Renfan Trading (4.9/5, 392 boutiques revendeuses). Vérifie sur ta
    // fiche CJ si ce SKU correspond bien à l'unité seule (la page affichait
    // une variante "Black 2pcs" — confirme avant le lancement).
    cjSku: "CJJT175857504DW",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
