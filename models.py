from html.parser import HTMLParser
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


class Book:
    def __init__(self, title, author, price, ISBN, weight, ship_weight):
        self.title = title
        self.author = author
        self.price = price
        self.ISBN = ISBN
        self.weight = weight
        self.shipping_weight = ship_weight

    def __repr__(self):
        return json.dumps(self.__dict__, indent=4)


class Box:
    def __init__(self, id, books):
        self.id = id
        self.contents = [book for book in books]
        self.total_weight = sum(book.weight for book in books)

    def __repr__(self):
        return self.contents


class Shipment:
    def __init__(self):
        self.boxes = []
        self.box_id = 0

    def add_box_to_shipment(self, box):
        self.boxes.append(box)

    def sort_books_by_weight(self, books):
        return sorted(books, key=lambda book: book.weight, reverse=True)

    def greedy_shipment(self, books):
        books = self.sort_books_by_weight(books)
        while books:
            box = []
            for book in books:
                current_weight = sum(book.weight for book in box)
                if 10 > (book.weight + current_weight):
                    box.append(book)
                    books.remove(book)
                else:
                    final_box = Box(self.box_id, box)
                    self.add_box_to_shipment(final_box)
                    box = []
                    self.box_id += 1

    def retrieve(self):
        return self.boxes