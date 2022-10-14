import { describe, it, afterEach } from "mocha";
import { handler } from "../index";
import { stub, restore } from "sinon";
import { strictEqual } from "assert";
import axios from "axios";

const executeLambda = async (): Promise<any> => {
  const output = await handler({});
  let outputBody = null;
  if (output) {
    outputBody = JSON.parse(output.body);
  }
  return outputBody;
};

const s3UrlFile = "https://s3fileurl.com";
const name = "__file_name__";

afterEach(restore);

describe("handler", () => {
  it("Function loads", async () => {
    const output = executeLambda()
  });

  it("Saves xml sitemap to s3", async () => {
  });
});
