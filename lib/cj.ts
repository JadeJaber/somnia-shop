// Intégration CJ Dropshipping (https://developers.cjdropshipping.com).
// Déclenche automatiquement la commande fournisseur quand un paiement Stripe
// est confirmé. Voir app/api/webhook/route.ts pour l'appel.

const CJ_API_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

// Noms de pays complets attendus par l'API CJ, pour les pays livrables
// configurés dans app/api/checkout/route.ts (shipping_address_collection).
const COUNTRY_NAMES: Record<string, string> = {
  FR: "France",
  BE: "Belgium",
  CH: "Switzerland",
  LU: "Luxembourg",
  DE: "Germany",
  ES: "Spain",
  IT: "Italy",
  GB: "United Kingdom",
  US: "United States",
  CA: "Canada",
};

type CjProduct = {
  sku: string;
  quantity: number;
  storeLineItemId?: string;
};

type CjShippingAddress = {
  name: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postal_code?: string | null;
  country: string; // code ISO 2 lettres
  phone?: string | null;
  email?: string | null;
};

let cachedAccessToken: { token: string; fetchedAt: number } | null = null;

async function getCjAccessToken(): Promise<string | null> {
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) return null;

  // Le token CJ est valide 15 jours ; on le garde en mémoire pour la durée
  // de vie de l'instance serveur plutôt que d'en redemander un à chaque commande.
  if (cachedAccessToken && Date.now() - cachedAccessToken.fetchedAt < 12 * 60 * 60 * 1000) {
    return cachedAccessToken.token;
  }

  const res = await fetch(`${CJ_API_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey }),
  });
  const data = await res.json();

  if (!data.result || !data.data?.accessToken) {
    console.error("Échec d'authentification CJ Dropshipping:", data.message ?? data);
    return null;
  }

  cachedAccessToken = { token: data.data.accessToken, fetchedAt: Date.now() };
  return cachedAccessToken.token;
}

export async function createCjOrder(params: {
  orderNumber: string;
  shipping: CjShippingAddress;
  products: CjProduct[];
}): Promise<{ ok: boolean; message: string }> {
  const accessToken = await getCjAccessToken();
  if (!accessToken) {
    return { ok: false, message: "CJ_API_KEY non configuré ou authentification échouée." };
  }

  const countryName = COUNTRY_NAMES[params.shipping.country];
  if (!countryName) {
    return {
      ok: false,
      message: `Pays de livraison "${params.shipping.country}" non mappé pour CJ (voir COUNTRY_NAMES dans lib/cj.ts).`,
    };
  }

  const logisticName = process.env.CJ_LOGISTIC_NAME ?? "CJPacket Ordinary";
  const fromCountryCode = process.env.CJ_FROM_COUNTRY_CODE ?? "CN";
  // iossType: 1=pas d'IOSS, 2=ton propre numéro IOSS, 3=IOSS de CJ.
  // Par défaut on utilise l'IOSS de CJ (3) car la plupart des dropshippers
  // n'ont pas leur propre enregistrement IOSS. Change CJ_IOSS_TYPE / ajoute
  // CJ_IOSS_NUMBER dans .env.local si tu as le tien (iossType=2).
  const iossType = Number(process.env.CJ_IOSS_TYPE ?? "3");
  const iossNumber = process.env.CJ_IOSS_NUMBER;

  const res = await fetch(`${CJ_API_BASE}/shopping/order/createOrderV2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": accessToken,
    },
    body: JSON.stringify({
      orderNumber: params.orderNumber,
      shippingCountryCode: params.shipping.country,
      shippingCountry: countryName,
      shippingProvince: params.shipping.state || params.shipping.city,
      shippingCity: params.shipping.city,
      shippingAddress: [params.shipping.line1, params.shipping.line2]
        .filter(Boolean)
        .join(", "),
      shippingCustomerName: params.shipping.name,
      shippingZip: params.shipping.postal_code ?? undefined,
      shippingPhone: params.shipping.phone ?? undefined,
      email: params.shipping.email ?? undefined,
      logisticName,
      fromCountryCode,
      iossType,
      iossNumber: iossType === 2 ? iossNumber : undefined,
      products: params.products,
    }),
  });

  const data = await res.json();
  if (!data.result) {
    return { ok: false, message: data.message ?? "Erreur inconnue lors de la création de la commande CJ." };
  }

  return { ok: true, message: `Commande CJ créée : ${data.data?.orderId ?? "?"}` };
}
