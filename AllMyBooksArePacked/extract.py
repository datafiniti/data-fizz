from bs4 import BeautifulSoup
from bookparser import set_details_from

def extract(n):
    """Extract books from n HTML files. Returns list of books."""
    books = []
    for i in range(1, n+1):
        # Parse HTML file
        parsed_html = BeautifulSoup(open('../data/book%d.html' % i), 'html.parser')
        book = set_details_from(parsed_html)    # Dictionary with key, value pairs of book details
        books.append(book)                      # List of dictionaries. List of books
    return books
