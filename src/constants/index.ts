const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const kms = new AWS.KMS();
const decrypted: any = {};

const decrypt = (secretName: string) => {
  if (decrypted[secretName]) {
    return decrypted[secretName];
  }
  try {
    const req = {
      CiphertextBlob: Buffer.from(
        (process.env as any)[secretName] ?? "",
        "base64"
      ),
    };
    let decryptedVal;
    kms
      .decrypt(req)
      .promise()
      .then((data: any) => {
        decryptedVal = data?.Plaintext.toString("ascii");
      });

    decrypted[secretName] = decryptedVal;
    return decryptedVal;
  } catch (err) {
    throw err;
  }
};

export const secrets = { decrypt };

const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET = secrets.decrypt("BUCKET");

const BASE_DOC_URL = secrets.decrypt("URL");
const BASE_API_URL = secrets.decrypt("API");

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

export var constants = {
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
