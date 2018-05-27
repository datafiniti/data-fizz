// install testing dependencies
const expect = require("chai").expect;
const chai = require('chai');
chai.use(require('chai-json'));
const fs = require("fs");
const createBox = require("../scripts/createBox");
const myoutput = require('../outputJSON.json');
const output = JSON.parse(fs.readFileSync("./outputJSON.json", "utf8"));

console.log(myoutput);

describe("Output JSON File", () => {
  it("Should be an object", () => {
    expect(output).to.be.an("object");
  });
  it("Weight to be returned as a string", () => {
    expect(output.Box1.totalWeight).to.be.a("string");
  });
});

describe("New Box", () => {
  it("Box name and id of box should always match", () => {
    const num = Math.random();
    expect(createBox({}, num).id).to.be.equal(num);
  });
});
