from extract import extract
from collect import *

books = extract(20)
book_weights = [book['shipping_weight'] for book in books]

boxes = []

box_keys = ['id', 'totalWeight', 'contents']
capacity = 10.0
    
(box, books) = collect_books_to_box(DP, books, 1)
print box
print len(books)
