import json
import operator
import os
from collections import defaultdict

import click
from bs4 import BeautifulSoup

import extractors as ext


def process_page(html_dir, book_id, book_file):
    book = {}
    with open(os.path.join(html_dir, book_file), 'rb') as f:
        text = f.read()
        soup = BeautifulSoup(text, "html.parser")

        book['internal_id'] = book_id
        book['title'] = ext.title_extractor(soup)
        book['author'] = ext.author_extractor(soup)
        book['price'] = ext.price_extractor(soup)
        book['ship_weight'] = ext.weight_extractor(soup)
        book['isbn_10'] = ext.isbn_extractor(soup)

    return book


def pack_into_boxes(book_list):
    id_weights = [(b['internal_id'], b['ship_weight']) for b in book_list]
    # Sorting them into boxes
    boxes = defaultdict(list)
    current_box = 0
    box_weight = 0
    for id, weight in reversed(sorted(id_weights, key=operator.itemgetter(1))):
        if box_weight + weight > 10:
            box_weight = 0
            current_box += 1

        boxes[current_box].append(id)
        box_weight += weight

    return boxes


@click.command()
@click.argument('html_dir', required=True, type=click.Path())
def process_dir(html_dir):
    list_of_books = os.listdir(html_dir)

    book_list = []
    for book_id, book_file in enumerate(list_of_books):
        book = process_page(html_dir, book_id, book_file)
        book_list.append(book)

    boxes = pack_into_boxes(book_list)

    boxes_json_obj = []
    for box_id in boxes:
        box_contents = boxes[box_id]
        boxes_json_obj.append(dict(box_id=box_id,
                                   contents=[book_list[i] for i in box_contents]))

    # Save it to a file.
    with open('scrape.json', 'w') as f:
        f.write(json.dumps(boxes_json_obj))


if __name__ == "__main__":
    process_dir()
