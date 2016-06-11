'use strict';

/* Regular Expressions
 *
 * This file contains Regular Expressions for Scraping Data from the Amazon Store.
 * The only category contained is books, but additional categories could be added 
 * for scraping data on different types of products.
 */

module.exports = {

  books : {
    title : /<span[^>]*id="btAsinTitle"[^>]*>([^<]+)\s*</,
    author : /(?:>([^<]+)<[^>]+>\s*<[^>]+>\(Author\)<|>\s*([a-zA-Z\s]+)<\/a>\s*<span\s*class="byLinePipe"\s*>\s*\(Editor\)\s*<\/span>)/,
    price : /(?:id="actualPriceValue"><b\s*class="priceLarge"[^>]*>\s*\$([0-9]+\.?[0-9]{1,2})\s*<\/b>|Buy New(?:.|\n)*\$([0-9]+\.?[0-9]{1,2}))/,
    weight : /<b>\s*Shipping Weight:\s*<\/b>\s*([0-9.]+)\s*[a-zA-Z]+\s*/,
    ISBN10 : /<b>ISBN-10:<\/b>\s*([a-zA-Z0-9]+)/,
  }

}
