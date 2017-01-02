var fs = require('fs');
var cheerio = require('cheerio');

exports.scrapeHtmlToJson = function(inputDir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.readdirSync(inputDir).map(
        file => {
            var json = scrapeToJson(inputDir + file);
            var filename = file.split('.html').shift() + '.json';
            fs.writeFileSync(outputDir + filename, JSON.stringify(json, null, 4));
        }
    )
}

function scrapeToJson(html) {
    var json = {
        title: "",
        author: "",
        price: "",
        shippingWeight: "",
        isbn10: ""
    };

    var $ = cheerio.load(fs.readFileSync(html));
    
    $('span#btAsinTitle').each(function(i, element) {
        var el = $(this);
        var title = el.text();
        json.title = title;
    })

    $('#handleBuy div.buying span a').each(function(i, element) {
        if (i == 0) {
            var el = $(this);
            var author = el.text();
            json.author = author;
        }
    })

    $('span#actualPriceValue').each(function(i, element) {
        var el = $(this);
        var price = el.text();
        json.price = price;
    })

    $('div .rentPrice').each(function(i, element) {
        var el = $(this);
        var price = el.text();
        json.price = price;
    })
    
    $('table#productDetailsTable ul li').each(function(i, element) {
        var el = $(this);
        var text = el.text();
        if (text.includes('Shipping Weight: ')){
            var start = text.indexOf(':') + 2;
            var end = text.indexOf('View', start) - 2;
            text = text.substring(start, end);
            json.shippingWeight = text;         
        }
        if (text.includes('ISBN-10: ')){
            json.isbn10 = text.split(': ').pop();   
        }       

    })
    return json;
}