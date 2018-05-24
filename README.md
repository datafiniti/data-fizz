# Progress

1. Followed the netinstructions, and got reddit scraper to work. The others (hacker news and buzzfeed) are getting 200 status error messages, indicating endpoint error.
1. Amazon book page can be scraped: 

* Name (product title):  `document.getElementById("productTitle").innerHTML`
* Description: `document.getElementById("iframeContent").innerHTML`
* Product dimension & Weight (shipping weight) can be found, but has to be manually extracted.
* Image URLs (pending)


# References
* Simple web scraping with Node.js / JavaScript ([netinstructions](http://www.netinstructions.com/simple-web-scraping-with-node-js-and-javascript/))
* Scraping the Web With Node.js ([scotch.io](https://scotch.io/tutorials/scraping-the-web-with-node-js))
* Introduction to Webcrawling (with Javascript and Node.js) ([Medium](https://medium.com/of-all-things-tech-progress/introduction-to-webcrawling-with-javascript-and-node-js-f5a3798ee8ac))