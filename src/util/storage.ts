import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { constants } from "../constants";

const s3Client = new S3Client({ region: constants.AWS_REGION });
const BUCKET = constants.S3_BUCKET;
const fileName = constants.FILENAME;

export const storage = {
  products: (content: string) => {
    const filePath = `products/${fileName}`;
    return storeXMLFile(content, filePath);
  },
  mainCategories: (content: string) => {
    const filePath = `main-categories/${fileName}`;
    return storeXMLFile(content, filePath);
  },
  subCategories: (content: string) => {
    const filePath = `sub-categories/${fileName}`;
    return storeXMLFile(content, filePath);
  },
  collections: (content: string) => {
    const filePath = `collections/${fileName}`;
    return storeXMLFile(content, filePath);
  },
  brands: (content: string) => {
    const filePath = `brands/${fileName}`;
    return storeXMLFile(content, filePath);
  },
};

var storeXMLFile = async (content: string, name: string): Promise<string> => {
  const key = `${name}.xml`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: Buffer.from(content),
    ContentType: "text/xml",
  });
  await s3Client.send(command);
  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
};
