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
      "Le Masque Blackout Confort bloque 100% de la lumière grâce à sa structure 3D sans contact avec les paupières. Doublure en soie mûrier, sangle ajustable en velcro silencieux, idéal pour les dormeurs sur le côté. Livré avec pochette de rangement et bouchons d'oreilles en mousse.",
    price: 24.9,
    compareAtPrice: 34.9,
    currency: "eur",
    images: [
      "https://images.unsplash.com/photo-1631157769293-9c9d3f0f1d3a?w=1200&q=80",
    ],
    features: [
      "Occultation 100% de la lumière",
      "Structure 3D sans pression oculaire",
      "Soie mûrier hypoallergénique",
      "Sangle silencieuse ajustable",
    ],
    stock: 250,
    badge: "Best-seller",
  },
  {
    slug: "masque-chauffant-lavande",
    name: "Masque Chauffant Lavande",
    tagline: "Chaleur douce + aromathérapie pour t'endormir plus vite",
    description:
      "Masque chauffant rechargeable avec diffusion de lavande, 3 niveaux de température, coupure automatique.",
    longDescription:
      "Combine thermothérapie et aromathérapie pour réduire les tensions oculaires et favoriser l'endormissement. Batterie rechargeable USB-C (12 cycles), 3 niveaux de chaleur (38°C / 42°C / 46°C), arrêt automatique après 15 minutes, poche à insérer avec des sachets de lavande séchée inclus (x3).",
    price: 32.9,
    compareAtPrice: 44.9,
    currency: "eur",
    images: [
      "https://images.unsplash.com/photo-1596205250067-8a0ce6ea8c48?w=1200&q=80",
    ],
    features: [
      "3 niveaux de température",
      "Diffusion de lavande incluse",
      "Rechargeable USB-C",
      "Arrêt automatique sécurisé",
    ],
    stock: 180,
    badge: "Nouveau",
  },
  {
    slug: "masque-audio-bluetooth",
    name: "Masque Audio Bluetooth Sommeil",
    tagline: "Écoute tes podcasts ou sons blancs sans écouteurs qui gênent",
    description:
      "Masque de sommeil avec haut-parleurs Bluetooth ultra-fins intégrés, autonomie 10h, occultation totale.",
    longDescription:
      "Haut-parleurs HD ultra-plats (moins de 3mm) intégrés dans un bandeau doux et respirant. Bluetooth 5.3, autonomie 10h en lecture, micro intégré pour les appels, compatible toutes les apps de sons blancs, méditation et podcasts. Lavable (module électronique amovible).",
    price: 39.9,
    compareAtPrice: 54.9,
    currency: "eur",
    images: [
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1200&q=80",
    ],
    features: [
      "Haut-parleurs Bluetooth 5.3 ultra-fins",
      "Autonomie 10h",
      "Module électronique amovible et lavable",
      "Micro intégré pour les appels",
    ],
    stock: 120,
    badge: "Tendance",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
