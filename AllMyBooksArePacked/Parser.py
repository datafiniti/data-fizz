#Robbie Zuazua
#Last Modified: 11/30/16

#**********************************************************
# We will use 
# 1) BeautifulSoup Python Library
#**********************************************************

from bs4 import BeautifulSoup

def sayHi():
		print("hi");

class Parser(object):

	def parseAll(self, bookName):
		#title
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		title = titleContainer.contents[0]
		print(title);

		#author
		authorContainer = titleContainer.parent.parent
		author = authorContainer.find('a').text
		print(author)

		#Isbn
		isbnContainer = soup.find(id="ASIN")
		isbn = isbnContainer['value']
		print(isbn)

		#Weight
		weightSibling = soup.find('b', string='Shipping Weight:')
		weightContainer = weightSibling.parent
		weight = weightContainer.contents[1]
		#weight always has form " x.x pounds (" we need to clean it up
		weight = weight[1:-2]									
		print (weight)

		#price
		priceContainer = soup.find(id="actualPriceContent")
		price = priceContainer.contents[0].text
		print(price)

	def parseTitle(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		title = titleContainer.contents[0]
		print(title);

	def parseAuthor(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		authorContainer = titleContainer.parent.parent
		author = authorContainer.find('a').text
		print(author)

	def parseIsbn(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		isbnContainer = soup.find(id="ASIN")
		isbn = isbnContainer['value']
		print(isbn)


	def parseShippingWeight(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		weightSibling = soup.find('b', string='Shipping Weight:')
		weightContainer = weightSibling.parent
		weight = weightContainer.contents[1]

		#weight always has form " x.x pounds (" we need to clean it up
		weight = weight[1:-2]									
		print (weight)

	def parsePrice(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		priceContainer = soup.find(id="actualPriceContent")
		price = priceContainer.contents[0].text
		print(price)







