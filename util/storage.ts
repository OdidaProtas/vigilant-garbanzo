import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "ap-northeast-1" });
const BUCKET = "sitemapstoragebucket";

export const bin = {
  storeXMLFile: async (content: string, name: string): Promise<string> => {
    const key = `${name}.xml`;
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(content),
      ContentType: "text/xml",
    });
    await s3Client.send(command);
    return `https://${BUCKET}.s3.amazonaws.com/${key}`;
  },
};

export const storage = {
  bin,
};
