from bs4 import BeautifulSoup

parsed_html = BeautifulSoup(open('data/book16.html'), 'html.parser')

def find_title_author(parsed_html):
    """Find title_author element"""
    return parsed_html.find('span', attrs={'id':'btAsinTitle'}).parent.parent

def find_product_details(parsed_html):
    """Find product_details element"""
    return parsed_html.find('table', attrs={'id':'productDetailsTable'}).tr.td.div.ul

def find_title(title_author):
    return str(title_author.h1.span.contents[0])

def find_author(title_author):
    return str(title_author.contents[3].a.text)

def find_price(parsed_html):
    return float(str(parsed_html.find('span', attrs={'id':'actualPriceValue'}).b.text)[1:])
   
def find_weight(product_details):
    return float(str(product_details.contents[13].contents[1][:-8]).strip())

def find_isbn(parsed_html):
    """Returns a string to preserve leading zeros"""
    return str(product_details.contents[7].contents[1]).strip()

title_author = find_title_author(parsed_html)
product_details = find_product_details(parsed_html)

# title = title_author.h1.span.text #if you also want [Hardcover] at the end
title = find_title(title_author)
author = find_author(title_author)
price = find_price(parsed_html)
shipping_weight = find_weight(product_details)
isbn_10 = find_isbn(product_details)

print 'Title:', title
print 'Author:', author
print 'Price:', price
print 'Weight:', shipping_weight
print 'ISBN:', isbn_10
