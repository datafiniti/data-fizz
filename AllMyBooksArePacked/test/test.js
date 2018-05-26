// install testing dependencies
const expect = require("chai").expect;
const fs = require("fs");
const output = JSON.parse(fs.readFileSync("./outputJSON.json", "utf8"));

describe("Output JSON File", () => {
  it("Should be an object", () => {
    expect(output).to.be.an("object");
  });
  it("Weight to be returned as a string", () => {
    expect(output.Box1.totalWeight).to.be.a('string');
  });
  it("Box id to be returned as a string", () => {
    expect(output.Box1.totalWeight).to.be.a('string');
  });
});
