# Crawling

## Purpose

This exercise is designed to test your ability to use JavaScript, object-oriented design principles, data structures, and standard algorithms to create a web crawler. We will not only be looking at the data points you have collected from the web, but at the style of your code, its modularity, its extensibility, and ease at which the app can be built and tested. As a small team, we believe these principles are a key element of our continued success.
 

## Problem Description

You will need to design and implement a basic web crawler that has two primary functions:

 1. The crawler must navigate from a “starting url” to a “listing page” on the website. 
 2. It must also collect a small number of specified attributes on the page. 

Usually we collect all products available on a site, but for this coding challenge we would like you to start on the "Walgreens.com" home page and navigate to the “Household Essentials” category. Navigate to at least 10 different products in this category and grab the following information (if it is available on the page):

 * Product Name
 * List Price
 * Description
 * Product Dimensions
 * Image URLs
 * Product UPC Code


Your application should output its results in a valid and well structured JSON document like the example below:


```json
{
    "product": {
        "id": 1,
        "productName": "Free & Clear Laundry Detergent",
        "listPrice": 7.69,
        "description": "When you have sensitive skin, clothes can itch and irritate. You deserve a free & gentle liquid laundry detergent for sensitive skin that delivers value. ARM & HAMMER Sensitive Skin Free & Clear liquid laundry detergent is concentrated with 2X powerful stain fighters in every drop vs. leading bargain detergent.",
        "productDimensions": "3.27 x 6.17 x 9.95 inches",
        "imageURLs": [
            "https://pics.drugstore.com/prodimg/648742/900.jpg",
            "https://pics.drugstore.com/prodimg/648742/2_900.jpg",
            "https://pics.drugstore.com/prodimg/648742/3_900.jpg"
        ],
        "productUPC": 03320097562,
        "sourceURL": "https://www.walgreens.com/store/c/arm-%26-hammer-free-%26-clear-laundry-detergent/ID=300427093-product"
    }
}

```

Once your solution is completed, please include a README.md file with build and execution instructions for your application. You will also need to add an EXTENSIONS.txt file to your solution that notes how your application could be extended to handle the following:

1. Products outside of the Household Essentials category.
2. Domains beyond Walgreens.com.

To begin, fork this repository to your personal Github account. We ask that you submit your solution within 1 week of forking the repo.

## Submission Requirements

* Use Javascript.
* You may use any third party libraries you wish. Any dependencies must be fully managed by a standard build tool for the language used.
* You must follow standard Object Oriented Design principles and techniques (submissions using only a single class are not acceptable).
* Email us with a link to your repository fork when you have finished your submission. 

## What We'll Be Looking For

* Code readability and reusability.
* Detail orientation.
* Clean and consistent data formatting.
* Testing is not required, but we'd love to see it.

## Useful Tools

If you are uncertain about where to start with your submission, consider looking into the following JavaScript tools:

* NodeJS: A JavaScript runtime environment that will enable you to utilize JavaScript outside of a browser.
* Cheerio: An implementation of jQuery meant for exposing the DOM of a given html page.
* Headless Crawling: Web crawling tools built for the purposes of browsing the internet without utilizing a user interface.

If you have any questions about this challenge, please let us know. 