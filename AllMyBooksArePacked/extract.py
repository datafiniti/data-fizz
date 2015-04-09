from bs4 import BeautifulSoup
from book import *
from bookparser import *

book = []
for i in range(1,21):        
    # Parse HTML file
    parsed_html = BeautifulSoup(open('data/book%d.html' % i), 'html.parser')

    # Extract important objects
    title_author = find_title_author(parsed_html)
    product_details = find_product_details(parsed_html)

    # title = title_author.h1.span.text #if you also want [Hardcover] at the end
    title = find_title(title_author)
    author = find_author(title_author)
    price = find_price(parsed_html)
    shipping_weight = find_weight(product_details)
    isbn_10 = find_isbn(product_details)

    book.append(Book(title, author, price, shipping_weight, isbn_10))
    book[-1].print_details()
    print '\n'
