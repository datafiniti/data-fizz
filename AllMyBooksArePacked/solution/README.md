# All My Books Are Packed Solution 1
## Usage

Make sure all dependencies are met by doing a 

```
npm install
```

on the project root.


```
./main.js --dir=[path_to_dir] -url=[url_to_scrap] --output=[file] --showperf
```
* --dir: Set a local directory and parse all files in said directory. This is a local scrapping. 
* --url: Set a url to start scrapping (not fully implemented, out of scope).
* --output: Set an output file, if no file is set, all output is directed to stdout.
* --showperf: Show execution time after the application has completed.

Example

```
node .\main.js --dir="../data/" --output="out.json"
```

### Sample Output

```json
[
    {
        "boxId": 1,
        "maxWeight": 10,
        "currentWeight": 9.4,
        "totalProducts": 1,
        "contents": [
            {
                "author": "Neil Gaiman",
                "isbn10": "0062255657",
                "isbn13": "978-0062255655",
                "publisher": "William Morrow; First Edition edition",
                "date": "June 18, 2013",
                "language": "English",
                "pages": "192",
                "name": "The Ocean at the End of the Lane: A Novel [Deckle Edge] [Hardcover]",
                "shipping_weight": "9.4",
                "price": "15.22"
            }
        ]
    },
	[...]

```

## App Description

Version 0.1: Parsing of local files from a directory ("data"). The applications goes through each file in the set directory (set by the "dir" argument), and parses them for the information set in the solution/parser/parameters.json file. An explanation how this file is used is in the next section.

### Architecture

#### Parser

The Parser module consists of the "AmazonParser" object, which inherits from a generic "Parser" object. 

* Generic Parser: "Barebones" package, implements Cheerio, fs and Requests (if needed) packages.
* AmazonParser: Inherits from Generic Parser, the "search" logic is implemented in this object.
* Config file: A "parameters.json" file defines what and how search will be performed:

```json
{
	"AmazonPage": {
		"prod_price":{"type":"selector", "path":"#actualPriceValue,.rentalPriceLabel:contains('Buy New')~.rentPrice"},
		"prod_shipping_weight":{"type":"selector", "path":"li:contains('shipping')", "searchon":"prod_content_table"},
		"prod_dimensions":{},
		"prod_name":{"type":"selector", "path":"#btAsinTitle"},
		"prod_content_table":{"type":"selector", "path":"#productDetailsTable .bucket > div > ul"},
		"ProductBook":{
			"author":{"type":"selector", "path":".byLinePipe"},
			"pages":{"type":"selector", "path":"li:contains('pages')", "searchon":"prod_content_table"},

```

First line defines the website we are looking for. The first level down defines the the fields that all (or most) Amazon pages share. The "ProductBook" level defines fields specific to "book" pages within the site.

##### Fields:

* type: The type of search we are doing. Example: Sizzle (jQuery selector) or Regex.
* path: The search parameters.
* searchon: Optional. Defines if we want to search on any existing object.

During parsing, the AmazonParser generates a product defintion (called "pseudo object" in the code). This product definition is then passed to the Domain package.

-----------------------------------------------------------

[Sidenote]: The idea behind this configuration file, is to able to generate the Parser object on the fly, by specifying which fields we want, and how to search for them. This however, has not been implemented in this version.

-----------------------------------------------------------


#### Domain (Product Handling)

The domain module is a rather generic approach at solving this problem. A handler object is in charge of ordering the products and adding them to the each box. More information can be found in the code.

#### Libraries

* Cheerio (html parsing via css selectors): https://github.com/cheeriojs/cheerio
* Yargs (command line argument parsing): https://github.com/bcoe/yargs
* Request (http client): https://github.com/request/request
