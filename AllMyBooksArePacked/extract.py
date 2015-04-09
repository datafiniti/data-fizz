from bs4 import BeautifulSoup
from book import *
from bookparser import *

book = []
for i in range(1,21):        
    # Parse HTML file
    parsed_html = BeautifulSoup(open('data/book%d.html' % i), 'html.parser')
    book_details = set_details_from(parsed_html)    
    book.append(Book(book_details))
