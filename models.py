from html.parser import HTMLParser
from math import ceil


class Book:
    def __init__(self, title, author, price, isbn, weight):
        self.title = title
        self.author = author
        self.price = price
        self.isbn = isbn
        self.weight = weight

    def get_numeric_weight(self):
        return float(self.weight[:self.weight.find(" p")])


class Box:
    def __init__(self, box_id, books):
        self.id = box_id
        self.contents = [book for book in books]
        self.total_weight = sum(book.get_numeric_weight() for book in books)
        self.total_weight = round(self.total_weight, 1)
        self.total_weight = "{0} pounds".format(self.total_weight)

    def remove_from_box(self, book):
        self.contents.remove(book)


class Shipment:
    def __init__(self):
        self.boxes = []
        self.box_id = 0

    def add_box_to_shipment(self, box):
        self.boxes.append(box)

    def finalize_box(self, box):
        final_box = Box(self.box_id, box)
        self.add_box_to_shipment(final_box)
        self.box_id += 1

    def create_from(self, books, n=None):
        books = sorted(books, key=lambda book: book.weight, reverse=True)
        total_weight = sum(book.get_numeric_weight() for book in books)
        box = []
        books_used = []

        if n and n > len(books):
            raise ValueError("N is larger than the number of books")

        elif n and n < ceil(total_weight/10):
            raise ValueError("N is so small that at least one box would exceed 10 pounds.")

        while books:
            if box:
                self.finalize_box(box)
            else:
                books_used = []

            box = []
            books = [book for book in books if book not in books_used]

            for book in books:
                current_weight = sum(book.get_numeric_weight() for book in box)
                if 10 >= (book.get_numeric_weight() + current_weight):
                    box.append(book)
                    books_used.append(book)

        if n and n > len(self.boxes):
            while n > len(self.boxes):
                for box in self.boxes:
                    if n == len(self.boxes):
                        break
                    if len(box.contents) > 1:
                        new_box = Box(self.box_id, [box.contents[0]])
                        box.remove_from_box(box.contents[0])
                        self.add_box_to_shipment(new_box)
                        self.box_id += 1

        del self.box_id


class AmazonParser(HTMLParser):
    data_inbound = None
    author = None
    title = None
    price = None
    isbn = None
    weight = None

    def handle_starttag(self, tag, attrs):
        if tag == "meta":
            if attrs[0][1] == "keywords" and attrs[1][0] == "content":
                data = attrs[1][1]
                self.author = data[:data.find(",")]

        if tag == "span":
            for attr in attrs:
                if "btAsinTitle" in attr:
                    self.data_inbound = "title"
                if "bb_price" in attr:
                    self.data_inbound = "price"

    def handle_data(self, data):
        if self.data_inbound == "title":
            self.title = data.strip()

        elif self.data_inbound == "price":
            self.price = data.strip()

        elif self.data_inbound == "ISBN":
            self.isbn = data.strip()

        elif self.data_inbound == "weight":
            self.weight = data.replace(" (", "").strip()

        self.data_inbound = None

        if "ISBN-10" in data:
            self.data_inbound = "ISBN"

        elif "Shipping Weight:" in data:
            self.data_inbound = "weight"

    def finalize(self, result_list):
        book = Book(self.title, self.author, self.price, self.isbn, self.weight)
        result_list.append(book)
