from bs4 import BeautifulSoup

parsed_html = BeautifulSoup(open('data/book16.html'), 'html.parser')

def find_title_author(parsed_html):
    return parsed_html.find('span', attrs={'id':'btAsinTitle'}).parent.parent

def find_product_details(parsed_html):
    return parsed_html.find('table', attrs={'id':'productDetailsTable'})

def find_title(title_author):
    return str(title_author.h1.span.contents[0])

def find_author(title_author):
    return str(title_author.contents[3].a.text)

def find_price(parsed_html):
    return float(str(parsed_html.find('span', attrs={'id':'actualPriceValue'}).b.text)[1:])
   
def find_weight(product_details):
    pass
    return product_details.contents

def find_isbn(parsed_html):
    pass

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
