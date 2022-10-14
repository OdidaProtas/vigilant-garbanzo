import * as builder from "xmlbuilder2";
import * as fs from "node:fs";
import { EventBridgeEvent } from "aws-lambda";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { handleException } from "./util/handleException";
import { createCategoryUrl, createProductUrl } from "./util/urls";

const axios = require("axios");

const BUCKET = "sitemapstoragebucket";
const s3Client = new S3Client({ region: "ap-northeast-1" });

const productsUrl = "https://api.africasokoni.ke/api/v1/products";
const categoriesUrl = "https://api.africasokoni.ke/api/v1/categories";

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

export const handler = async (event: any, context: any): Promise<any> => {
  const output: Output = {
    title: "",
    s3_url: "",
    error: "",
  };

  try {
    const productsDataPromise = axios.get(productsUrl);
    const categoriesDataPromise = axios.get(categoriesUrl);

    const [
      {
        data: { results: productsData },
      },
      ,
    ] = await handleException(productsDataPromise);

    const [
      {
        data: { results: categoriesData },
      },
      ,
    ] = await handleException(categoriesDataPromise);

    const products = productsData ?? [];
    const categories = categoriesData ?? [];

    let doc = builder
      .create({ version: "1.0", encoding: "UTF-8" })
      .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" });

    for (let product of products) {
      doc
        .ele("url")
        .ele("loc")
        .txt(createProductUrl(product))
        .up()
        .ele("lastmod")
        .txt(new Date().toDateString())
        .up()
        .ele("priority")
        .txt("0.8")
        .up()
        .up();
    }

    for (let category of categories) {
      doc
        .ele("url")
        .ele("loc")
        .txt(createCategoryUrl(category))
        .up()
        .ele("lastmod")
        .txt(new Date().toDateString())
        .up()
        .ele("priority")
        .txt("0.8")
        .up()
        .up();
    }

    const xml = doc.doc().end({ prettyPrint: true });
    output.s3_url = await storage.storeXMLFile(xml, "sokoni-web-sitemap");
    context.succeed("done");
  } catch (err: any) {
    output.error = err.message;
    console.error(err);
    context.succeed("done");
  }
};
