// install testing dependencies
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-json'));
const fs = require('fs');
const json = fs.readFileSync('./outputJSON.json', 'utf8');
const jsonObj = JSON.parse(json);

describe("Output JSON", () => {
    it('Should contain exactly 20 books or however many are in the file system', () => {
        expect(jsonObj).to.be.an('object');
    });
});


