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
    return float(str(parsed_html.find('span', attrs={'class':'bb_price'}).text).strip()[1:].replace(',',''))
   
def find_weight(product_details):
    """
    Returns weight in pounds
    
    We might be reiterating through product_details,
    but this will help in case we need to find weights
    in a different context for scraping data.
    
    Can change this to improve speed.
    """
    for listItem in product_details:
        if listItem.b.text == 'Shipping Weight:':
            return float(listItem.contents[1][1:-9])

def find_isbn(product_details):
    """Returns a string to preserve leading zeros"""    
    for listItem in product_details:
        if listItem.b.text == 'ISBN-10:':
            return str(listItem.contents[1]).strip()
