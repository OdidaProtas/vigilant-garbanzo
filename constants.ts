const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET = process.env.S3_BUCKET;

const PRODUCTS_URL = "https://api.africasokoni.ke/api/v1/products";
const CATEGORIES_URL = "https://api.africasokoni.ke/api/v1/categories";

const FILENAME = "sitemap";

export const constants = {
  PRODUCTS_URL,
  CATEGORIES_URL,
  FILENAME,
  AWS_REGION,
  S3_BUCKET,
};
