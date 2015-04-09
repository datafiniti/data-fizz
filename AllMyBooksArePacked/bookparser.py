from bs4 import BeautifulSoup

def find_title_author(parsed_html):
    """Find title_author_element.
    Contains title and author.
    """
    return parsed_html.find('span', attrs={'id':'btAsinTitle'}).parent.parent

def find_product_details(parsed_html):
    """Find product_details_element.
    Contains weight and ISBN.
    """
    return [x for x in parsed_html.find('table', attrs={'id':'productDetailsTable'}).tr.td.div.ul.contents if x != u'\n']

def find_title(title_author_element):
    return str(title_author_element.h1.span.contents[0])

def find_author(title_author_element):
    return str(title_author_element.contents[3].a.text)

def find_price(parsed_html):
    """Returns price in USD as float"""
    return float(str(parsed_html.find('span', attrs={'class':'bb_price'}).text).strip()[1:].replace(',',''))
   
def find_weight(product_details):
    """Returns weight in pounds as float
    
    We might be reiterating through product_details,
    but this will help in case we need to find weights
    in a different context for scraping data.
    
    Can change this to improve speed.
    """
    for listItem in product_details:
        if listItem.b.text == 'Shipping Weight:':
            return float(listItem.contents[1][1:-9])

def find_isbn(product_details):
    """Returns string to preserve leading zeros"""    
    for listItem in product_details:
        if listItem.b.text == 'ISBN-10:':
            return str(listItem.contents[1]).strip()
            
def set_details_from(parsed_html):
    # Extract important objects
    title_author = find_title_author(parsed_html)
    product_details = find_product_details(parsed_html)

    # title = title_author.h1.span.text #if we want [Hardcover] at the end
    title = find_title(title_author)
    author = find_author(title_author)
    price = find_price(parsed_html)
    shipping_weight = find_weight(product_details)
    isbn_10 = find_isbn(product_details)
    
    return (title, author, price, shipping_weight, isbn_10)
