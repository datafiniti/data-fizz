// Require Dependencies
const fs = require("fs");
const cheerio = require("cheerio");
const Box = require("./constructors/Box.js");
const Contents = require("./constructors/Contents.js");

// json variable that will be used as the output
const outputJSON = {};

// Count number of files in directory so we can loop over any amount in the future
const dir = "./data";
const files = fs.readdirSync(dir);

// set up Initial box for storing books
const boxCount = 1;
outputJSON["Box" + boxCount] = new Box(boxCount);

// Filesystem code that will be doing the scraping
// ${files[i]}
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
    // console.log(content);


    // Make a condition to sort the books by weight
    console.log(parseFloat(content.shipping_weight.split(" ")[2]));
    outputJSON.Box1.contents.push(content);

    // Output file that will be the raw json of the boxes
    fs.writeFileSync("outputJSON.json", JSON.stringify(outputJSON, null, 2));
  });
}
