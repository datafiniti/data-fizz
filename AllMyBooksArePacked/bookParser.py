#Robbie Zuazua
#Last Modified: 12/4/16

#**********************************************************
# We will use 
# 1) BeautifulSoup Python Library
#**********************************************************

from bs4 import BeautifulSoup
import Book

class Parser(object):

	#********************************************************************************************
	#This function is called every time I need to parse the html. 
	#It will parse Title, Author, Isbn, Weight, and Price
	#********************************************************************************************
	def parseAll(self, bookName):
		#Create book object to store parsed data
		bookObject = Book.myBook()

		#parse title
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		if(titleContainer is not None):
			title = titleContainer.contents[0]
			bookObject.setTitle(title)
		else:
			print("Error: Could Not find title")
		

		#parse author
		if(titleContainer is not None):
			authorContainer = titleContainer.parent.parent
			if(authorContainer is not None):
				author = authorContainer.find('a').text
				if(author is not None):
					bookObject.setAuthor(author)

				else:
					print("Error: Could Not find Author")
			else:
				print("Error: Could Not find Author")
		else:
			print("Error: Could Not find Author")

		#parse Isbn
		isbnContainer = soup.find(id="ASIN")
		if(isbnContainer is not None):
			isbn = isbnContainer['value']
			bookObject.setIsbn(isbn)

		else:
			print("Error: Could Not find ISBN")

		#Parse weight
		weightSibling = soup.find('b', string='Shipping Weight:')
		if(weightSibling is not None):
			weightContainer = weightSibling.parent
			if(weightContainer is not None):
				weight = weightContainer.contents[1]
				#weight always has form " x.x pounds (" we need to clean it up
				weight = weight[1:-2]									
				bookObject.setWeight(weight)

			else:
				print("Error: Could Not find weight")
		else:
			print("Error: Could Not find weight")

		#Parse price
		PriceContainer1 = soup.findAll(id="actualPriceExtraMessaging")
		if(PriceContainer1 is not None):
			for priceContainer2 in PriceContainer1:
				Element = priceContainer2.previous_element.previous_element
				if(Element is not None):
					bookObject.setPrice(Element)

				else:
					print("Error: Could Not find price")
		else:
			print("Error: Could Not find price")

		return bookObject;

	#********************************************************************************************
	#The Folowing functions are used for debugging purposes 
	#********************************************************************************************

	def parseTitle(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		if(titleContainer is not None):
			title = titleContainer.contents[0]
			print(title);
		else:
			print("Error: Could Not find title")

	def parseAuthor(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		if(titleContainer is not None):
			authorContainer = titleContainer.parent.parent
			if(authorContainer is not None):
				author = authorContainer.find('a').text
				if(author is not None):
					print(author)
				else:
					print("Error: Could Not find Author")
			else:
				print("Error: Could Not find Author")
		else:
			print("Error: Could Not find Author")

	def parseIsbn(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		isbnContainer = soup.find(id="ASIN")
		if(isbnContainer is not None):
			isbn = isbnContainer['value']
			print(isbn)
		else:
			print("Error: Could Not find ISBN")

	def parseShippingWeight(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		weightSibling = soup.find('b', string='Shipping Weight:')
		if(weightSibling is not None):
			weightContainer = weightSibling.parent
			if(weightContainer is not None):
				weight = weightContainer.contents[1]
				#weight always has form " x.x pounds (" we need to clean it up
				weight = weight[1:-2]									
				print (weight)
			else:
				print("Error: Could Not find weight")
		else:
			print("Error: Could Not find weight")

	def parsePrice(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		PriceContainer1 = soup.findAll(id="actualPriceExtraMessaging")
		if(PriceContainer1 is not None):
			for priceContainer2 in PriceContainer1:
				Element = priceContainer2.previous_element.previous_element
				if(Element is not None):
					print(Element)
				else:
					print("Error: Could Not find price")
		else:
			print("Error: Could Not find price")








