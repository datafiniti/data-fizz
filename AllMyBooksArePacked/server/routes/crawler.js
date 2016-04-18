var express = require("express");
var router = express.Router();
var crawler = require("../crawler/crawler.js");
var Promise = require("promise");

router.get('/', function (req, res) {
    var url_list = crawler.generate_url_list();
    var bookpromise = crawler.getTitles_from_url_list(url_list);
    bookpromise.then(function (books) {
        res.status(200).json(books);
    });
});
module.exports = router;