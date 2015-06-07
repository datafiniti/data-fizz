#!/usr/bin/env python

import sys
import os
import json
from boxer import Boxer, Box
from scrapers import amazon

def to_json(boxer, pretty=True):
    l = []
    counter = 0
    for box in boxer.boxes:
        counter += 1
        box_dict = {
            'id': counter,
            'total_weight': box.current_weight(),
            'item_count': len(box.books)
        }

        items = []
        for book in box.books:
            book_dict = {
                'title': book.title,
                'isbn10': book.isbn10,
                'author': book.author,
                'shipping_weight': book.shipping_weight,
                'price': book.price
            }
            items.append(book_dict)
        box_dict['items'] = items

        l.append(box_dict)

    return json.dumps(l, indent=4)

def main(argv):
    # TODO: Command line parameters.

    books = []
    path = './data'
    
    debug = False
    if len(argv) > 1 and argv[1] == 'debug':
        debug = True

    for file in os.listdir(path):
        if file.endswith('.html'):
            f = os.path.join(path, file)
            book = amazon.parse(open(f, encoding='ISO-8859-1'))
            books.append(book)

    boxer = Boxer()
    unpacked = boxer.pack(books)

    if debug:
        if len(unpacked) > 0:
            print("Unable to pack the following books:")
            for b in unpacked:
                print(b.title)

        print("Packed the following books:")
        count = 0
        for box in boxer.boxes:
            count += 1
            print("Box #: %d (Quantity: %d, Weight: %.2f)" % (count, len(box.books), box.current_weight()))
            for book in box.books:
                print("\t%s (Shipping Weight: %.2f)" % (book.title, book.shipping_weight))

        print("JSON:")

    print(to_json(boxer))

if __name__ == '__main__':
    main(sys.argv)
