export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number; // en euros
  compareAtPrice?: number;
  currency: "eur";
  images: string[];
  features: string[];
  stock: number;
  badge?: string;
  // SKU de la variante CJ Dropshipping choisie pour ce produit, utilisé par
  // l'automatisation de commande fournisseur (voir app/api/webhook/route.ts).
  // Sans cette valeur, la commande CJ n'est pas déclenchée automatiquement.
  cjSku?: string;
};

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
