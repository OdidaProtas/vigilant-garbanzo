import axios from "axios";
import * as builder from "xmlbuilder";
import { EventBridgeEvent } from "aws-lambda";

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
): Promise<any> => {
  const output: Output = {
    title: "",
    s3_url: "",
    error: "",
  };

  try {
    // const products = axios.get()
    // const categories = axios.get()
    let xml = builder
      .create("root")
      .ele("xmlbuilder")
      .ele(
        "repo",
        { type: "git" },
        "git://github.com/oozcitak/xmlbuilder-js.git"
      )
      .end({ pretty: true });

    output.s3_url = await storage.storeXMLFile(xml, "name");
  } catch (err: any) {
    output.error = err.message;
    console.error(err);
  }
};
