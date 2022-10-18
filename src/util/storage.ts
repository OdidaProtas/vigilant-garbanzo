import { handleException } from "./handleException";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { constants } from "../constants";

const {
  PRODUCTS_DIR,
  MAIN_CATEGORIES_DIR,
  SUB_CATEGORIES_DIR,
  COLLECTIONS_DIR,
  BRANDS_DIR,
  AWS_REGION,
  S3_BUCKET,
  FILENAME,
  CHILD_CATEGORIES_DIR,
} = constants;

const s3Client = new S3Client({ region: AWS_REGION });

export const storage = {
  products: (content: string) => {
    const filePath = `${PRODUCTS_DIR}${FILENAME}`;
    return bin.storeXMLFile(content, filePath);
  },
  mainCategories: (content: string) => {
    const filePath = `${MAIN_CATEGORIES_DIR}${FILENAME}`;
    return bin.storeXMLFile(content, filePath);
  },
  subCategories: (content: string) => {
    const filePath = `${SUB_CATEGORIES_DIR}${FILENAME}`;
    return bin.storeXMLFile(content, filePath);
  },
  collections: (content: string) => {
    const filePath = `${COLLECTIONS_DIR}${FILENAME}`;
    return bin.storeXMLFile(content, filePath);
  },
  brands: (content: string) => {
    const filePath = `${BRANDS_DIR}${FILENAME}`;
    return bin.storeXMLFile(content, filePath);
  },
  childCategories: (content: string) => {
    const filePath = `${CHILD_CATEGORIES_DIR}${FILENAME}`;
    return bin.storeXMLFile(content, filePath);
  },
};

export async function storeXMLFile(content: string, file: string) {
  const key = `${file}.xml`;
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: Buffer.from(content),
    ContentType: "text/xml",
  });
  await handleException(s3Client.send(command));
  return `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
}

export var bin = { storeXMLFile };
