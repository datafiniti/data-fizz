from html.parser import HTMLParser
from math import ceil
import json


class BookParser(HTMLParser):
    data_inbound = None
    author = None
    title = None
    price = None
    ISBN_10 = None
    weight = None
    ship_weight = None

    def handle_starttag(self, tag, attrs):
        if tag == "meta":
            if attrs[0][1] == "keywords" and attrs[1][0] == "content":
                data = attrs[1][1]
                self.author = data[:data.find(",")]

        if tag == "span":
            for attr in attrs:
                if "btAsinTitle" in attr:  # handles book title
                    self.data_inbound = "title"

        if tag == "b" and attrs and "priceLarge" in attrs[0]:
            self.data_inbound = "price"

    def handle_data(self, data):
        if self.data_inbound == "title":
            self.title = data.strip()

        elif self.data_inbound == "price":
            self.price = data.strip()

        elif self.data_inbound == "ISBN":
            self.ISBN_10 = data.strip()

        elif self.data_inbound == "weight":
            self.ship_weight = data.replace(" (", "").strip()
            self.weight = float(self.ship_weight[:self.ship_weight.find(" p")])

        self.data_inbound = None

        if "ISBN-10" in data:
            self.data_inbound = "ISBN"

        elif "Shipping Weight:" in data:
            self.data_inbound = "weight"

    def finalize(self, result_list):
        book = Book(self.title, self.author, self.price, self.ISBN_10, self.weight, self.ship_weight)
        result_list.append(book)


class Encoder(json.JSONEncoder):
    def default(self, obj):
        return obj.__dict__


class Book:
    def __init__(self, title, author, price, ISBN, weight, ship_weight):
        self.title = title
        self.author = author
        self.price = price
        self.ISBN = ISBN
        self.weight = weight
        self.shipping_weight = ship_weight


class Box:
    def __init__(self, box_id, books):
        self.box_id = box_id
        self.contents = [book for book in books]
        self.total_weight = sum(book.weight for book in books)


class Shipment:
    def __init__(self):
        self.boxes = []

    def add_box_to_shipment(self, box):
        self.boxes.append(box)

    def create_from(self, books, n=None):
        books = sorted(books, key=lambda book: book.weight, reverse=True)
        total_weight = sum(book.weight for book in books)

        if n and n > len(books):
            raise ValueError("N is larger than the number of books")
        elif n and n < ceil(total_weight/10):
            raise ValueError("N is so small that at least one box would exceed 10 pounds.")

        while books:
            box = []
            box_id = 0
            for book in books:
                current_weight = sum(book.weight for book in box)
                if 10 > (book.weight + current_weight):
                    box.append(book)
                    books.remove(book)
                else:
                    final_box = Box(box_id, box)
                    self.add_box_to_shipment(final_box)
                    box = []
                    box_id += 1