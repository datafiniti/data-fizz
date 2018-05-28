// Require Dependencies
const fs = require("fs");
const scraper = require("./scripts/scraper");
const createBox = require("./scripts/createBox");
const addBook = require("./scripts/addBook");

// json variable that will be used to write the output data
const outputJSON = {};

// Count number of files in directory so we can loop over any amount in the future
const dir = "./data";
const files = fs.readdirSync(dir);

// set up Initial box for storing books
let boxCount = 1;
let currentBox = createBox(outputJSON, boxCount);

// Access the file system loop through each html doc. Scrape from each one of those.
for (let i = 0; i < files.length; i++) {
  fs.readFile(`./data/${files[i]}`, "utf8", function(err, result) {
    if (err) {
      console.log(err);
    }
    // scraper function parses and organizes content from each file
    const content = scraper(result);
    console.log(content);

    // Set up individual variables to see if a new box is needed or not
    const individualBookWeight = parseFloat(
      content.shipping_weight.split(" ")[0]
    );
    let currentTotalWeight = currentBox.totalWeight;

    // Condition statement for deciding which box this current book will go into.
    currentTotalWeight += individualBookWeight;
    if (currentTotalWeight <= 10) {
      addBook(content, individualBookWeight, currentBox);
    } else {
      boxCount++;
      currentBox = createBox(outputJSON, boxCount);
      addBook(content, individualBookWeight, currentBox);
      const weightIntegar = outputJSON["Box" + (boxCount - 1)].totalWeight;
      outputJSON[
        "Box" + (boxCount - 1)
      ].totalWeight = `${weightIntegar} pounds`;
    }

    // Output file that will be the raw json of the boxes
    if (i === files.length - 1) {
      fs.writeFileSync("outputJSON.json", JSON.stringify(outputJSON, null, 2));
    }
    return result;
  });
}
