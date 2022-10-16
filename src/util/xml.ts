import * as builder from "xmlbuilder2";

export function create(items: any, createUrl: any) {
  let newDoc = builder
    .create({ version: "1.0", encoding: "UTF-8" })
    .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" });

  for (let product of items) {
    newDoc
      .ele("url")
      .ele("loc")
      .txt(createUrl(product))
      .up()
      .ele("lastmod")
      .txt(new Date().toDateString())
      .up()
      .ele("priority")
      .txt("0.8")
      .up()
      .up();
  }

  const xml = newDoc.doc().end({ prettyPrint: true });

  return xml;
}

export const xml = { create };
