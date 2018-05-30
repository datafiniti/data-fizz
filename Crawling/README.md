# Crawling

## Purpose

This exercise is designed to test your ability to use object-oriented design principles, data structures and standard algorithms to create a web crawler. We will not only be looking at the data points you have collected from the web, but at the style of your code, its modularity, its extensibility, and ease at which the app can be built and tested. As a small team we believe these principles are a key element of our continued success.
 

## Problem Description

You will need to design and implement a basic web crawler that has two primary functions.  The crawler must navigate from a “starting url” to a “listing page” on the website.  It must also collect a small number of specified attributes on the page.  Usually we collect all products available on a site, but for this coding challenge we would like you to start on amazon’s home page and navigate to the book category.  Collect at least 10 books and grab the following information (if it is available on the page).

You will need to design and implement a fully functioning web crawler that can locate the following data points:

* Name
* List Price
* Description
* Product Dimensions
* Image URLs
* Weight

Your application should output its results in a valid and well structured JSON document like the example below:


```json
{
    "product": {
        "id": 1,
        "name": "Sushi at Home: a Mat-To-Table Sushi Cookbook",
        "listPrice": 17.99,
        "description": "Eating Sushi is Easy. Making Sushi is Even Easier.Let your love of sushi inspire you to prepare and enjoy it in your home. This beautiful guide and cookbook opens a window to everything that's so fascinating--and intimidating--about sushi, while laying out easy-to-follow tips and techniques to help sushi lovers become confident sushi chefs.",
        "product_dimension": "8 X 0.6 X 8 inches",
        "imageURLs": [
            "https://images-na.ssl-images-amazon.com/images/I/611AZDSUHvL._SY496_BO1,204,203,200_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81ECOQVXVGL.jpg"
        ],
        "weight": "13.9 oz",
        "sourceURL": "https://www.amazon.com/gp/product/1623155975/ref=s9_acsd_simh_bw_c_x_1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-3&pf_rd_r=5S54Z6125KJDKW8DEBTV&pf_rd_r=5S54Z6125KJDKW8DEBTV&pf_rd_t=101&pf_rd_p=fe185ec9-c8f5-44c0-897e-4c0bde93268c&pf_rd_p=fe185ec9-c8f5-44c0-897e-4c0bde93268c&pf_rd_i=283155"
    }
    
}
```

Once your solution is completed please add an EXTENSIONS.txt file to your solution that notes how your application could be extended to handle the following:

1. Domains beyond Amazon.com
2. Products beyond just simply books.

To begin fork this repository to your personal Github account. We ask that you submit your solution within 1 week of forking the repo.

## Submission Requirements

* Use Javascript.
* You may use any third party libraries you wish. Any dependencies must be fully managed by a standard build tool for the language used.
* You must follow standard Object Oriented Design principles and techniques (e.g., submissions with only a single class are not worthy).
* Submit a pull request to this repository when you are ready to share your solution.

## What We'll Be Looking For

* Code readability and reusability.
* Testing is not required, but we'd love to see it.

---

# Solution

## Notes
1. Followed the netinstructions, and got reddit scraper to work. The others (hacker news and buzzfeed) are getting 200 status error messages, indicating endpoint error.
1. Amazon book page can be scraped: 

* Name (product title):  `document.getElementById("productTitle").innerHTML`
* Description: `document.getElementById("iframeContent").innerHTML` 

* (Updated) `$('iframe#bookDesc_iframe').contentDocument.body.childNodes[1].innerHTML`
* (Updated) `$('iframe#bookDesc_iframe').contentDocument.body.childNodes[1].textContent`
* (Another) `$('#bookDesc_iframe').contentDocument.childNodes[0].childNodes[1].childNodes[1].innerHTML`

* Product dimension & Weight (shipping weight) can be found, but has to be manually extracted.
* Image URLs (pending)

1. Use the ASIN/ISBN: if 10 digit numeric code and not alphanumeric, it can safely be assumed the associated product is a book. 

## Useful tips
* `Object.getOwnPropertyNames(object)`
* `Ctrl+U` in the browser will show open `view-source` of the rendered page, which reflects closely what jQuery/cheerio is working with.
* Firefox dev console is slightly better in displaying the output in cascading format.

## References
* Simple web scraping with Node.js / JavaScript ([netinstructions](http://www.netinstructions.com/simple-web-scraping-with-node-js-and-javascript/))
* Scraping the Web With Node.js ([scotch.io](https://scotch.io/tutorials/scraping-the-web-with-node-js))
* Introduction to Webcrawling (with Javascript and Node.js) ([Medium](https://medium.com/of-all-things-tech-progress/introduction-to-webcrawling-with-javascript-and-node-js-f5a3798ee8ac))
