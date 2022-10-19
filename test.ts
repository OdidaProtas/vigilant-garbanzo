import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { describe, it, afterEach } from "mocha";
import { stub, restore } from "sinon";
import { strictEqual } from "assert";
import axios from "axios";
import { handler } from "./src";
import { bin } from "./src/util";
import { constants } from "./src/constants";

import { XMLParser } from "fast-xml-parser";

const executeLambda = async () => {
  const testEvent: any = {};
  const output = await handler(testEvent);
  return output ? output : null;
};

afterEach(restore);

const productsUrl = "https://sitemap-gen-stage/products/sitemap.xml";
const expectedUrl = `${constants.BASE_DOC_URL}/slug-1`;
const mockApiResponse = {
  results: [{ slug: "slug-1" }, { slug: "slug-2" }],
};

describe("Handler", function () {
  it("Stores XML files", async function (done) {
    stub(axios, "get").resolves({ data: mockApiResponse });
    stub(bin, "storeXMLFile").resolves(productsUrl);
    const output = await executeLambda();
    const parser = new XMLParser();
    let parsedXML = parser.parse(output?.products?.doc ?? "");
    const loc = parsedXML?.urlset?.url[0].loc;
    strictEqual(output?.products.url, productsUrl);
    strictEqual(loc, expectedUrl);
    if (/undefined/.test(loc)) {
      done("Invalid sitemap loc url");
    } else {
      done();
    }
  });
});
