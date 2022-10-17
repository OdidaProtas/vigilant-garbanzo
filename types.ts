export type TOutput = {
  products: TOutputItem;
  mainCategories: TOutputItem;
  subCategories: TOutputItem;
  collections: TOutputItem;
  brands: TOutputItem;
  childCategories: TOutputItem;
};

type TOutputItem = {
  url: string;
  doc: string;
};

export type TProduct = {
  id: string;
  slug: string;
};

export type TCategory = {
  id: string;
  slug: string;
};
