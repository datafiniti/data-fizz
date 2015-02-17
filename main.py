from bs4 import BeautifulSoup
from models import Book
import os
import glob
import time


start = time.time()
os.chdir("data")


def extract_content(tag):
    start = tag.find(">") + 1
    end = tag.find("<", start)
    return tag[start:end].strip()


def parse_files(directory):
    results = []
    for file in directory:
        working_file = open(file, "r", encoding="ISO-8859-1")
        soup = BeautifulSoup(working_file.read())

        title = extract_content(str(soup.find(id="btAsinTitle")))

        author_data = str(soup.findAll("meta", {"name": "keywords"})[0])
        author = author_data[author_data.find('"') + 1:author_data.find(",")]

        price_data = soup.findAll("span", {"class": "bb_price"})[0]
        price = extract_content(str(price_data))

        remaining_data = str(soup.findAll("td", {"class": "bucket"})[0])
        soup = BeautifulSoup(remaining_data)
        remaining_data = soup.findAll("li")

        for data in remaining_data:
            if "ISBN-10" in str(data):
                ISBN = str(data)
            elif "Weight" in str(data):
                weight = str(data)

        ISBN = ISBN[ISBN.find("</b> ") + 5:ISBN.find("</li>")]
        weight = weight[weight.find("</b> ") + 5:weight.find(" (")]

        new_book = Book(title, author, price, ISBN, weight)
        results.append(new_book)

    return results


directory = glob.glob("*.html")
results = parse_files(directory)
print(results)
print(time.time() - start)
