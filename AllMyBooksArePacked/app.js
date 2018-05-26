// Require Dependencies
const fs = require("fs");
const cheerio = require("cheerio");
const Box = require("./constructors/Box.js");

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
    const $ = cheerio.load(result);
    const title = $("#btAsinTitle")
      .text()
      .trim();
    const author = $("#handleBuy .buying span a")
      .first()
      .text()
      .trim();
    const price = $("#actualPriceValue .priceLarge").text() + " USD";
    const shipRegex = /(<li><b>Shipping Weight:<\/b>).+/g;
    const shipping_weight = $("#productDetailsTable .content ul")
      .html()
      .trim()
      .match(shipRegex)[0]
      .split(" ")
      .slice(2, 4)
      .join(" ");
    const isbn10 = $("#productDetailsTable .content ul li:nth-child(4)")
      .text()
      .trim()
      .split(" ")[1];
    const content = {
      title,
      author,
      price,
      shipping_weight,
      "isbn-10": isbn10
    };

    // Set up individual variables to see if a new box is needed or not
    const individualBookWeight = parseFloat(
      content.shipping_weight.split(" ")[0]
    );
    // console.log(individualBookWeight);
    // console.log(content.shipping_weight.split(' ')[2]);
    let currentTotalWeight = outputJSON["Box" + boxCount].totalWeight;

    // Condition statement for deciding which box this current book will go into.
    currentTotalWeight += individualBookWeight;
    if (currentTotalWeight <= 10) {
      outputJSON["Box" + boxCount].totalWeight += individualBookWeight;
      outputJSON["Box" + boxCount].contents.push(content);
    } else {
      boxCount++;
      outputJSON[""];
      outputJSON["Box" + boxCount] = new Box(boxCount);
      outputJSON["Box" + boxCount].totalWeight += individualBookWeight;
      outputJSON["Box" + boxCount].contents.push(content);
    }

    // Output file that will be the raw json of the boxes
    if (i === files.length - 1) {
      fs.writeFileSync("outputJSON.json", JSON.stringify(outputJSON, null, 2));
    }
  });
}
