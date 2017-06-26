import os
import parse
import book_sort

path = os.path.dirname(os.path.abspath(__file__))
book_dir = os.path.join(path, 'data')

def weight(book):
    return float(book['shipping_weight'].split()[0])

def pack(directory, max_weight):
    shelf = book_sort.Shelf(weight)

    for filename in os.listdir(directory):
        with open(os.path.join(directory, filename), 'r') as f:
            book = parse.amazon_book(f.read())
            shelf.add(book)

    boxes = []

    def new_box():
        return {
            'id': len(boxes)+1,
            'totalWeight': 0,
            'contents': []
        }

    current_box = new_box()

    def format_and_add(box):
        box['totalWeight'] = "{} pounds".format(box['totalWeight'])
        boxes.append(box)

    for book in shelf:
        if current_box['totalWeight']+weight(book) > max_weight:
            format_and_add(current_box)
            current_box = new_box()
        current_box['contents'].append(book)
        current_box['totalWeight'] += weight(book)

    format_and_add(current_box)

    return boxes
