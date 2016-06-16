from lxml import html
from bs4 import BeautifulSoup
from pprint import pprint
from operator import itemgetter
import json
import requests

bookList = ["data/book1.html", "data/book2.html",
		"data/book3.html", "data/book4.html",
		"data/book5.html", "data/book6.html",
		"data/book7.html", "data/book8.html",
		"data/book9.html", "data/book10.html",
		"data/book11.html", "data/book12.html",
		"data/book13.html", "data/book14.html",
		"data/book15.html", "data/book16.html",
		"data/book17.html", "data/book18.html",
		"data/book19.html", "data/book20.html",]

class Product(object):

	def __init__(self, productPage):
		self.loadData(productPage)

	#load all data from the Product Details Table
	def loadData(self, productPage):
		with open(bookPage, 'r') as myfile:
		    data = myfile.read().replace('\n', '')
		soup = BeautifulSoup(data, "lxml")

		details = {}
		for li in soup.select('table#productDetailsTable div.content ul li'):
			try:
				detailName = li.b
				key = detailName.text.strip()
				value = title.next_sibling.strip()
				details[key] = value.encode('ascii')
			except AttributeError:
				break

		self.details = details


class Book(Product):

	def __init__(self, bookPage="data/book1.html"):
		self.loadData(bookPage)

	#Overrides the Product superclass loadData to load only specific data
	def loadData(self, bookPage):
		#isbn and weight initialized as empty strings to prevent 
		#errors in case one of them isn't available
		isbn = ""
		weight = ""

		with open(bookPage, 'r') as myfile:
		    data = myfile.read().replace('\n', '')
		tree = html.fromstring(data)
		soup = BeautifulSoup(data, "lxml")


		title = tree.xpath('//span[@id="btAsinTitle"]/text()')
		#Scraping the author data in a way that supports multiple authors
		author = soup.findAll("span", { "class" : "byLinePipe" })
		authors = []
		for span in author:
			try:
				role = span.text
				if list(role.encode('ascii'))[0] == '(':
					name = span.previous_sibling.previous_sibling.text
					authors.append(name.encode('ascii'))
			except AttributeError:
				break

		#Load data from the Product Details Table
		for li in soup.select('table#productDetailsTable div.content ul li'):
			try:
				detailName = li.b
				key = detailName.text.strip()
				if key == "ISBN-10:":
					isbn = detailName.next_sibling.strip()
				if key == "Shipping Weight:":
					weight = detailName.next_sibling.strip()
					weight = float(weight.split()[0].strip())
					break
			except AttributeError:
				break


		price = tree.xpath('//span[@class="bb_price"]/text()')

		self.price = price[0].split()[0]
		self.isbn = isbn.encode('ascii')
		self.weight = weight
		self.authors = authors
		self.title = title[0]

class Box(object):

	def __init__(self, books = [], totalWeight = 0.0, boxid = 1):
		self.boxid = boxid
		self.totalWeight = totalWeight
		self.contents = books
		
		

	def addBook(self, book):
		if book['weight'] + self.totalWeight <= 10.0:
			self.contents.append(book)
			self.totalWeight = self.totalWeight + book['weight']
			return True
		else:
			return False

def main(bookPages=bookList):
	allBooks = []
	allBoxes = []
	for page in bookPages:
		currBook = Book(page)
		allBooks.append(currBook.__dict__)
	sortedBooks = sorted(allBooks, key=itemgetter('weight'))
	boxid = 1
	#Packages the lightest and heaviest books together 
	#until package cannot add more books due to weight
	while sortedBooks:
		currBox = Box([], 0.0, boxid)
		if len(sortedBooks) == 1:
			currBox.addBook(sortedBooks[0])
			sortedBooks.remove(sortedBooks[0])
			break
		currBox.addBook(sortedBooks[len(sortedBooks) - 1])
		while currBox.addBook(sortedBooks[0]):
			sortedBooks.remove(sortedBooks[0])
		sortedBooks.remove(sortedBooks[len(sortedBooks) - 1])
		allBoxes.append(currBox.__dict__)
		boxid += 1
	return json.dumps(allBoxes, sort_keys=True, indent=4, separators=(',', ': '))

output = main()
target = open('result.txt', 'w+')
target.write(output)


