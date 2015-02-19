from html.parser import HTMLParser
from models import Book
import os
import glob
import time

results = []
start = time.time()
os.chdir("data")


class BookParser(HTMLParser):
    data_inbound = None
    author = None
    title = None
    price = None
    ISBN_10 = None
    weight = None

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
            self.weight = data.replace(" (", "").strip()

        self.data_inbound = None

        if "ISBN-10" in data:
            self.data_inbound = "ISBN"

        elif "Shipping Weight:" in data:
            self.data_inbound = "weight"


    def finalize(self, result_list):
        book = Book(self.title, self.author, self.price, self.ISBN_10, self.weight)
        result_list.append(book)


def parse_files(directory):
    for file in directory:
        working_file = open(file, "r", encoding="ISO-8859-1")
        parser = BookParser()
        parser.feed(working_file.read())
        parser.finalize(results)


directory = glob.glob("*.html")
parse_files(directory)
print(results)
print(time.time() - start)
