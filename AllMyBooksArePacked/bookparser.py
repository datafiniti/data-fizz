from bs4 import BeautifulSoup
from book import *

def find_title_author(parsed_html):
    """Find title_author_element"""
    return parsed_html.find('span', attrs={'id':'btAsinTitle'}).parent.parent

def find_product_details(parsed_html):
    """Find product_details_element"""
    return [x for x in parsed_html.find('table', attrs={'id':'productDetailsTable'}).tr.td.div.ul.contents if x != u'\n']

def find_title(title_author_element):
    return str(title_author_element.h1.span.contents[0])

def find_author(title_author_element):
    return str(title_author_element.contents[3].a.text)

def find_price(parsed_html):
    return float(str(parsed_html.find('span', attrs={'id':'actualPriceValue'}).b.text)[1:])
   
def find_weight(product_details):
    pass
    #return float(str(product_details_element.contents[13].contents[1][:-8]).strip())

def find_isbn(product_details):
    """Returns a string to preserve leading zeros"""    
    for listItem in product_details:
        if listItem.b.text == 'ISBN-10:':
            return str(listItem.contents[1]).strip()
    

# Parse HTML file
parsed_html = BeautifulSoup(open('data/book%d.html' % 6), 'html.parser')

# Extract important objects
title_author = find_title_author(parsed_html)
product_details = find_product_details(parsed_html)

# title = title_author.h1.span.text #if you also want [Hardcover] at the end
title = find_title(title_author)
author = find_author(title_author)
price = find_price(parsed_html)
shipping_weight = find_weight(product_details)
isbn_10 = find_isbn(product_details)

book = Book(title, author, price, shipping_weight, isbn_10)
book.print_details()
print '\n'
