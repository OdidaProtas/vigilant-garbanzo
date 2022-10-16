import { TCategory, TProduct } from "../../types";
import { constants } from "../constants";

const { BASE_DOC_URL, URL_PATHS } = constants;

export function product(product: TProduct): string {
  return `${BASE_DOC_URL}/${product.slug}`;
}
export function mainCategory(c: TCategory): string {
  return `${BASE_DOC_URL}/${URL_PATHS.mainCategory}/${c.slug}`;
}

export function subCategory(c: TCategory): string {
  return `${BASE_DOC_URL}/${URL_PATHS.subCategory}/${c.slug}`;
}

export function collections(c: TCategory): string {
  return `${BASE_DOC_URL}/${URL_PATHS.collections}/${c.slug}`;
}

export function brands(c: TCategory): string {
  return `${BASE_DOC_URL}/${URL_PATHS.brands}/${c.slug}`;
}

export function childCategory(c: TCategory): string {
  return `${BASE_DOC_URL}/${URL_PATHS.childCategories}/${c.slug}`;
}

export const urls = {
  product,
  mainCategory,
  subCategory,
  collections,
  brands,
  childCategory,
};
