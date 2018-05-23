// Require Dependencies
const fs = require("fs");
const cheerio = require("cheerio");

// Constuctor for making boxes

// json variable that will be used as the output
const boxJSON = {};

// Count number of files in directory so we can loop over any amount in the future
const dir = "./data";
const files = fs.readdirSync(dir);


// Filesystem code that will be doing the scraping
for (let i = 0; i < files.length; i++) {
  fs.readFile(`./data/${files[i]}`, "utf8", function(err, result) {
    const $ = cheerio.load(result);
    const title = $("#btAsinTitle").text();
    console.log(title);
  });
}

// Output file that will be the raw json of the boxes
fs.writeFileSync("Output.json");
