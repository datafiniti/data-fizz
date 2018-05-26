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
    const $ = cheerio.load(result);
    const title = $("#btAsinTitle")
      .text()
      .trim();
    const author = $("#handleBuy .buying span a")
      .first()
      .text()
      .trim();
    const price = $("#actualPriceValue .priceLarge").text() + " USD";
    // const shipRegex = /Shipping Weight/g;
    const shipping_weight = $(
      "#productDetailsTable .content ul li:nth-child(7)"
    )
      .text()
      .trim();
    // const shipping_weight = $("#productDetailsTable .content ul");
    const isbn10 = $("#productDetailsTable .content ul li:nth-child(4)")
      .text()
      .trim();
    const content = { title, author, price, shipping_weight, isbn10 };

    // Set up individual variables to see if a new box is needed or not
    const individualBookWeight = parseFloat(
      content.shipping_weight.split(" ")[2]
    );
    let totalWeight = outputJSON["Box" + boxCount].totalWeight;

    // Condition statement for deciding which box this current book will go into.
    totalWeight += individualBookWeight;
    if (totalWeight <= 10) {
      outputJSON["Box" + boxCount].totalWeight += individualBookWeight;
      outputJSON["Box" + boxCount].contents.push(content);
    } else {
      boxCount++;
      outputJSON[""]
      outputJSON["Box" + boxCount] = new Box(boxCount);
      outputJSON["Box" + boxCount].totalWeight += individualBookWeight;
      outputJSON["Box" + boxCount].contents.push(content);
    }

    // Output file that will be the raw json of the boxes
    if (i === (files.length)) {
      fs.writeFileSync("outputJSON.json", JSON.stringify(outputJSON, null, 2));
      return;
    }
  });
}

// syncro attempt
// const scrape = files => {
//   for (let i = 0; i < files.length; i++) {
//     const bookHTML = fs.readFileSync(`./data/book1.html`, "utf8");
//     const $ = cheerio.load(bookHTML);
//     const title = $("#btAsinTitle").text().trim();
//     console.log(title);
//   }
// };
// scrape(files);
