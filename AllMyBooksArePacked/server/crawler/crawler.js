var cheerio = require('cheerio');
var request = require('request');
var Promise = require("promise");
var HashMap = require('hashmap');




exports.generate_url_list = function () {
    var url_list = []
    for (var x = 1; x <= 1; x++) {
        url_list.push("http://localhost:3000/books/" + x);
    }
    return url_list;
}

exports.getTitles_from_url_list = function (url_list) {
    return new Promise(function (resolve, reject) {
        var promises = [];
        url_list.forEach(function (element) {
            promises.push(getTitle(element));
        }, this);
        Promise.all(promises).then(function (values) {
            resolve(values);
        })
    });


}

function getTitle(pageToVisit) {
    return new Promise(function (resolve, reject) {
        request(pageToVisit, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            var $ = cheerio.load(body);
            var booktitlevalues = $('title').text();
            var values_arrays = booktitlevalues.split(":");
            var book = {};
            if (values_arrays.length == 6) {
                book.title = values_arrays[0] + values_arrays[1];
                book.author = values_arrays[2].trim();
            };
            if (values_arrays.length == 5) {
                book.title = values_arrays[0];
                book.author = values_arrays[1].trim();
            }
            var productdetail = new HashMap();
            $('#productDetailsTable > tr > td.bucket > div.content > ul').children().each(function () {
                var currentelement = $(this).html().split("</b>");
                currentelement[0] = currentelement[0].replace("<b>", "").trim();
                currentelement[1] = currentelement[1].trim();
                productdetail.set(currentelement[0],currentelement[1]);
            });;
            console.log("detail: " + productdetail.get("ISBN-10:"));
            book.isbn10 = productdetail.get("ISBN-10:");
            book.shipping_weight = productdetail.get("Shipping Weight:").split("(")[0].trim();
            book.price = $("#actualPriceValue > b").text();
            resolve(book);
        });
    });

};



