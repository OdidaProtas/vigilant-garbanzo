export function createCategoryUrl(category: any): string {
  return `https://africasokoni.co.ke/m/${category.slug}`;
}

export function createProductUrl(product: any): string {
  return `https://africasokoni.co.ke/${product.slug}`;
}
