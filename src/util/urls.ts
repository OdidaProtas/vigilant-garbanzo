import { TCategory, TProduct } from "../../types";

export function category(c: TCategory): string {
  return `https://africasokoni.co.ke/m/${c.slug}`;
}

export function product(p: TProduct): string {
  return `https://africasokoni.co.ke/${p.slug}`;
}

export const urls = {
  product,
  category,
};
