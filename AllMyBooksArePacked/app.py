#----------------------------------------------------------------------------
# This is a simple python script intended to be a soltuion to the challenge
#  presented here: https://github.com/datafiniti/DataFizz/tree/master/AllMyBooksArePacked 
#  To run this script simply execute it in your terminal.
#  It will write the final ouptput to a text file in the same directory.
#  It is a simple solution, due mostly to time constraints... please be kind...

# dependencies
import os
import glob
import json
import pprint
from lxml import html
from collections import namedtuple


#----------------------------------------------------------------------------
# iterable raw html data object
#  I'm assuming that there would be an effort to standardize the saving 
#  and retrieving of the scraped HTML data. It should probably result in an
#  iterable object that returns the raw HTML file as a string. The current 
#  method of loading the HTML data is just a hack to achieve this.
class RawHtmlData:

    def __init__(self, htmldir):
        self.dirls = glob.glob( os.path.join(htmldir,"*.html") )
        self.numls = len(self.dirls)
        self.idx = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.idx < self.numls:
            src = self.dirls[self.idx]
            with open (src, encoding="utf8", errors='replace') as f:
                rawHtml = f.read()
                self.idx += 1
                return rawHtml
        else:
            raise StopIteration()



#----------------------------------------------------------------------------
# defined html feature-xpath profiles
#  this acts as map to tell where each feature value is in the HTML
#  using xpath queries. This way, searching for a different feature
#  set for a different product or on a different web site is as easy
#  swapping in a different profile. In its current state, this does
#  does not handle the issue of inconsistently formated product pages.
#  I chose not to address this issue due to time constraints.

FEATURE_XPATH_PROFILES = {}
FEATURE_XPATH_PROFILES["AMAZON_BOOK"] = {
    "title": "/html/body//div[@class='buying']/h1[@class='parseasinTitle ']/span[@id='btAsinTitle']/text()",
    "author": "/html/body//div[@class='buying']/span/span[@class='byLinePipe']/../a/text()",
    "price": "/html/body//td[@id='actualPriceContent']/span[@id='actualPriceValue']/b[@class='priceLarge']/text()",
    "shipping_weight": "/html/body//ul/li/b[text()='Shipping Weight:']/../text()",
    "isbn10": "/html/body//ul/li/b[text()='ISBN-10:']/../text()",
    "isbn13": "/html/body//ul/li/b[text()='ISBN-13:']/../text()",
    "language": "/html/body//ul/li/b[text()='Language:']/../text()",
    "publisher": "/html/body//ul/li/b[text()='Publisher:']/../text()"
}


#----------------------------------------------------------------------------
# define book feature structure
#  This is just used to define the structure of the of book object.
#  This way, processing the data of a different product is as easy
#  as swapping in a different namedtuple
Book = namedtuple('Book', [
    "title",
    "author",
    "price",
    "shipping_weight",
    "isbn10"
])

# directory containing this file
filedir = os.path.dirname(os.path.realpath(__file__))

#----------------------------------------------------------------------------
# settings...



# directory to html files
htmldir = os.path.join(filedir, "data")

# select html feature profile
fprofile = FEATURE_XPATH_PROFILES["AMAZON_BOOK"]

# select product structure
Product = Book

# select max weight of a box
max_box_lb = 10.0

# select output file
output_path = os.path.join(filedir, "output.txt")



#----------------------------------------------------------------------------
# It occurs to me that it might be beneficial to have two distinct data 
#  structures: (1) the feature data structure with the more raw values 
#  extracted from an HTML page, and (2) the more well-defined product 
#  data structure. Product records are created by mapping the data from 
#  the feature data structure to the product data structure. This way, 
#  as the application scales, each page could be digested only once, and 
#  perhaps multiple product data structures could be generated from each.
#
#  As the application scales it will most likely be necessary to 
#  persist the record of each data structure in a database. The the sake
#  of this coding challenge, I'm just storing this data in memory.
#  
#  In its current state, this doesn't do any formatting or normalization
#  of the data extracted from HTML. This would surel be necessary for this
#  application to be useful in the real world. I did not address this
#  issue here due to time constraints.


# instantiate iterable HTML data object
rawHtmlData = RawHtmlData(htmldir)


# extract the chosen set of features from each HTML source
features_sets = []
for rawHtml in rawHtmlData:
    
    # generate object tree from HTML string
    tree = html.fromstring(rawHtml)

    # extract feature values described in chosen profile
    features = {}
    for name in fprofile:
        
        # query tree for feature value
        query = fprofile[name]
        qresult = tree.xpath(query)
        if qresult:
            value = qresult[0].strip()
        else:
            value = "NOT_FOUND"
        
        # save feature
        features[name] = value
        
    # save product
    features_sets.append(features)
    

# map extracted feature sets to product structures
products = []
for feature_set in features_sets:
    product = {}
    for field in Product._fields:
        if field in fprofile:
            product[field] = feature_set[field]
        else:
            product[field] = ""
    products.append(product)
        

#----------------------------------------------------------------------------
# The presented challenge of dividing the books into boxes did not
#  have any demands related to the cost-efficiency of physically
#  shipping of the boxes. It was only asked to consider the efficiency
#  of the process that sorts the products into the boxes. Optimization 
#  of the packing is known as the Multiple Knapsack Problem. It has
#  been rigorously studied, and there a many proposed solution out there.
#  This 
    
# create boxes data structure and first box data structure
boxes = []
bIdx = 0    # box index
boxes.append(
    {
        "box": {
            "id": 0,
            "totalWeight": 0.0,
            "contents": []
        }
    }
)

# pack products in boxes
for product in products:
    
    # determine if adding new product will make box overweight
    prod_lb = float(product['shipping_weight'].split(" ")[0])
    new_box_lb = boxes[bIdx]["box"]["totalWeight"] + prod_lb
    if new_box_lb > max_box_lb:

        # create new box to fill
        bIdx += 1
        boxes.append(
            {
                "box": {
                    "id": 0,
                    "totalWeight": 0.0,
                    "contents": []
                }
            }
        )
        new_box_lb = prod_lb

    # add book to newest box
    boxes[bIdx]["box"]["contents"].append(product)
    boxes[bIdx]["box"]["totalWeight"] = new_box_lb
        
# restructure the boxes data stucture to pretty printing
boxes = {
    "boxes": boxes
}
        
# write results to file as in json
with open(output_path, 'w') as outfile:    
    output = json.dumps(boxes,outfile,sort_keys=True,indent=4)
    outfile.write(output)


