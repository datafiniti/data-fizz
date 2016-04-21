var express = require("express");
var router = express.Router();
var crawler = require("../crawler/crawler.js");
var knapsack = require("../knapsack/knapsack.js");
var Promise = require("promise");
var Quicksort = require("../quicksort/quicksort.js");

router.get('/', function (req, res) {
    var url_list = crawler.generate_url_list();
    var bookpromise = crawler.getTitles_from_url_list(url_list);
    bookpromise.then(function (books) {
        var boxs = knapsack.getBoxes(books, 10);
        res.status(200).json(boxs);
    });
});
module.exports = router;