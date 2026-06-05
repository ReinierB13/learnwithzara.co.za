export type BasketProduct = {
  id: number;
  title: string;
  slug: string;
  description: string;
  grade: string | null;
  subject: string;
  productType: string;
  priceCents: number;
  currency: string;
  isFree: boolean;
  fileUrl: string;
  thumbnailUrl: string | null;
};

export type BasketItem = {
  product: BasketProduct;
  quantity: number;
};

export const BASKET_STORAGE_KEY = "learn_with_zara_basket";

export function formatBasketPrice(product: BasketProduct) {
  if (product.isFree) {
    return "Free";
  }

  return `${product.currency} ${(product.priceCents / 100).toFixed(2)}`;
}

export function productMeta(product: BasketProduct) {
  return [
    product.grade ? `Grade ${product.grade}` : "All grades",
    product.subject,
    product.productType,
  ].join(" / ");
}

export function readBasket() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(BASKET_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const items = JSON.parse(stored) as BasketItem[];

    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function writeBasket(items: BasketItem[]) {
  window.localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("learn-with-zara-basket"));
}

export function getBasketItemCount(items: BasketItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function addProductToBasket(product: BasketProduct) {
  const current = readBasket();
  const existing = current.find((item) => item.product.id === product.id);
  const next = existing
    ? current.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    : [...current, { product, quantity: 1 }];

  writeBasket(next);
  return next;
}
