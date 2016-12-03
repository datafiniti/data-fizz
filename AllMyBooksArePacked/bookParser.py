#Robbie Zuazua
#Last Modified: 11/30/16

#**********************************************************
# We will use 
# 1) BeautifulSoup Python Library
#**********************************************************

from bs4 import BeautifulSoup
import Book

class Parser(object):

	def parseAll(self, bookName):
		#Create book object to store parsed data
		bookObject = Book.myBook()

		#title
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		if(titleContainer is not None):
			title = titleContainer.contents[0]
			#print(title);
			bookObject.setTitle(title)
		else:
			print("Error: Could Not find title")
		

		#author
		if(titleContainer is not None):
			authorContainer = titleContainer.parent.parent
			if(authorContainer is not None):
				author = authorContainer.find('a').text
				if(author is not None):
					#print(author)
					bookObject.setAuthor(author)

				else:
					print("Error: Could Not find Author")
			else:
				print("Error: Could Not find Author")
		else:
			print("Error: Could Not find Author")

		#Isbn
		isbnContainer = soup.find(id="ASIN")
		if(isbnContainer is not None):
			isbn = isbnContainer['value']
			#print(isbn)
			bookObject.setIsbn(isbn)

		else:
			print("Error: Could Not find ISBN")

		#Weight
		weightSibling = soup.find('b', string='Shipping Weight:')
		if(weightSibling is not None):
			weightContainer = weightSibling.parent
			if(weightContainer is not None):
				weight = weightContainer.contents[1]
				#weight always has form " x.x pounds (" we need to clean it up
				weight = weight[1:-2]									
				#print (weight)
				bookObject.setWeight(weight)

			else:
				print("Error: Could Not find weight")
		else:
			print("Error: Could Not find weight")

		#price
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
	#Used for debugging purposes 
	#Can test Title parsing methodology here
	def parseTitle(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		titleContainer = soup.find(id="btAsinTitle")
		if(titleContainer is not None):
			title = titleContainer.contents[0]
			print(title);
		else:
			print("Error: Could Not find title")

	#Used for debugging purposes 
	#Can test Author parsing methodology here
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

	#Used for debugging purposes 
	#Can test ISBN parsing methodology here
	def parseIsbn(self, bookName):
		soup = BeautifulSoup(open(bookName), "html.parser")
		isbnContainer = soup.find(id="ASIN")
		if(isbnContainer is not None):
			isbn = isbnContainer['value']
			print(isbn)
		else:
			print("Error: Could Not find ISBN")

	#Used for debugging purposes 
	#Can test Weight parsing methodology here
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

	#Used for debugging purposes 
	#Can test Price parsing methodology here
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








