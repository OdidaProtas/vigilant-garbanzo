const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET = process.env.S3_BUCKET;

const BASE_DOC_URL = process.env.BASE_DOC_URL;
const BASE_API_URL = process.env.BASE_API_URL;

const PRODUCTS_URL = `${BASE_API_URL}/products?is_approved=true`;
const MAIN_CATEGORIES_URL = `${BASE_API_URL}/categories`;
const SUB_CATEGORIES_URL = `${BASE_API_URL}/sub-categories`;
const COLLECTIONS_URL = `${BASE_API_URL}/collections`;
const BRANDS_URL = `${BASE_API_URL}/brands`;
const CHILD_CATEGORIES_URL = `${BASE_API_URL}/child-categories`;

const FILENAME = "sitemap";

const PRODUCTS_DIR = "products/";
const MAIN_CATEGORIES_DIR = "main-categories/";
const SUB_CATEGORIES_DIR = "sub-categories/";
const COLLECTIONS_DIR = "collections/";
const BRANDS_DIR = "brands/";
const CHILD_CATEGORIES_DIR = "child-categories/";

const URL_PATHS = {
  mainCategory: "m",
  subCategory: "s",
  collections: "cls",
  brands: "brands",
  childCategories: "c",
};

export const constants = {
  FILENAME,
  AWS_REGION,
  S3_BUCKET,
  PRODUCTS_DIR,
  MAIN_CATEGORIES_DIR,
  SUB_CATEGORIES_DIR,
  COLLECTIONS_DIR,
  BRANDS_DIR,
  MAIN_CATEGORIES_URL,
  PRODUCTS_URL,
  BRANDS_URL,
  COLLECTIONS_URL,
  SUB_CATEGORIES_URL,
  CHILD_CATEGORIES_URL,
  CHILD_CATEGORIES_DIR,
  BASE_DOC_URL,
  BASE_API_URL,
  URL_PATHS,
};
