import { describe, it, afterEach } from "mocha";
import { handler } from "../index";
import { stub, restore } from "sinon";
import { strictEqual } from "assert";
import axios from "axios";

const executeLambda = async (url: string, name: string): Promise<any> => {
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
  it("...products", async () => {
    stub(axios, "get").resolves({ data: `` });
  });

  it("...categories", async () => {
    stub(axios, "get").resolves({ data: `` });
  });

  it("file url", async () => {
  });
});
