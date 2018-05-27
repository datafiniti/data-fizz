// Require Dependencies
const fs = require("fs");
// const cheerio = require("cheerio");
const Box = require("./constructors/Box.js");
const scrape = require('./scripts/scrape.js');

// json variable that will be used as the output
const outputJSON = {};

// Count number of files in directory so we can loop over any amount in the future
const dir = "./data";
const files = fs.readdirSync(dir);

// set up Initial box for storing books
let boxCount = 1;
outputJSON["Box" + boxCount] = new Box(boxCount);

// Filesystem code that will be doing the scraping
// to look through all files: ${files[i]}
for (let i = 0; i < files.length; i++) {
  fs.readFile(`./data/${files[i]}`, "utf8", function(err, result) {
    if (err) {
      console.log(err);
    }
    scrape(result);
    // const $ = cheerio.load(result);
    // const title = $("#btAsinTitle")
    //   .text()
    //   .trim();
    // const author = $("#handleBuy .buying span a")
    //   .first()
    //   .text()
    //   .trim();
    // const price = $("#actualPriceValue .priceLarge").text() + " USD";
    // const shipRegex = /(<li><b>Shipping Weight:<\/b>).+/g;
    // const shipping_weight = $("#productDetailsTable .content ul")
    //   .html()
    //   .trim()
    //   .match(shipRegex)[0]
    //   .split(" ")
    //   .slice(2, 4)
    //   .join(" ");
    // const isbnRegex = /(<li><b>ISBN-10:<\/b>).\w+/g;
    // const isbn10 = $("#productDetailsTable .content ul")
    //   .html()
    //   .trim()
    //   .match(isbnRegex)[0]
    //   .split(" ")
    //   .slice(1)
    //   .join("");
    // const content = {
    //   title,
    //   author,
    //   price,
    //   shipping_weight,
    //   "isbn-10": isbn10
    // };

    // Set up individual variables to see if a new box is needed or not
    const individualBookWeight = parseFloat(
      scrape(result).shipping_weight.split(" ")[0]
    );
    let currentTotalWeight = outputJSON["Box" + boxCount].totalWeight;

    // Condition statement for deciding which box this current book will go into.
    currentTotalWeight += individualBookWeight;
    if (currentTotalWeight <= 10) {
      outputJSON["Box" + boxCount].totalWeight += individualBookWeight;
      outputJSON["Box" + boxCount].contents.push(scrape(result));
    } else {
      boxCount++;
      outputJSON[""];
      outputJSON["Box" + boxCount] = new Box(boxCount);
      outputJSON["Box" + boxCount].totalWeight += individualBookWeight;
      outputJSON["Box" + boxCount].contents.push(scrape(result));
    }

    // Output file that will be the raw json of the boxes
    if (i === files.length - 1) {
      fs.writeFileSync("outputJSON.json", JSON.stringify(outputJSON, null, 2));
    }
    return result;
  });
}
