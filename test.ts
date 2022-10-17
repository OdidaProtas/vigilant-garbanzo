import * as fs from "fs";
import * as path from "path";
import { handler } from "./src";

describe("Config variables", function () {
  it("Checks if .env file is created", function (done) {
    fs.readFile(path.join(__dirname, ".env"), done);
  });
});

describe("Saves sitemaps", function () {
  it("Checks the output of handler", async function (done) {
    let testEvent: any = {};
    const output = await handler(testEvent);
    if (output) done();
  });
});
