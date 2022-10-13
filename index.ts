import { EventBridgeEvent, S3BatchResult } from "aws-lambda";
import * as cheerio from "cheerio";
import axios from "axios";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const BUCKET = "sitemap generator";
const s3Client = new S3Client({ region: "us-east-2" });

export const storage = {
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

export interface Output {
  title: string;
  s3_url: string;
  error: string;
}

export const handler = async (
  event: Partial<EventBridgeEvent<any, any>>
): Promise<S3BatchResult> => {
  const output: Output = {
    title: "",
    s3_url: "",
    error: "",
  };

  try {
    output.s3_url = await storage.storeXMLFile({...{}}, body.name);
  } catch (err) {
    output.error = err.message;
    console.error(err);
  }

};
