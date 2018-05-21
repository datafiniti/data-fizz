const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load();

// constuctor for making boxes
function box(id) {
    this.id = id
    this.totalWeight = function() {
        let weight = 0;
        this.contents.map(i => {
            weight += this.contents.shipping_weight
        });
        return weight;
    },
    this.contents = [];
}

const mybox = new box(1);
console.log(mybox.totalWeight());

// json variable that will be used as the output
const boxJSON = {}

// Filesystem code that will be doing the scraping
const readMe = fs.readFileSync('./data/book1.html', 'utf8');


// Output file that will be the raw json of the boxes
fs.writeFileSync('Output.json');
