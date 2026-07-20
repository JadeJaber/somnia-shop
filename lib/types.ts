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
};

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
