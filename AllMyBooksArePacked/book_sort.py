
import json
import re
from bs4 import BeautifulSoup

class warehouse:


	def __init__(self):

		#A collection holding all unsorted books in the warehouse
		self.books = []

		#A collection holding all crates in the warehouse
		self.crates = []
	


	def add_book(self,book):
		self.books.append(book)

	def get_shipment(self,num_items):
		#Assumptions:
		# 	1) Weight is in pounds
		#	2) If there's a rent option, choose the new book price
		#	3) Just pass in the number of items to add to warehouse. Code can be added later to make this dynamic for an unknown shipment size.
		#	4) location is a file path to the book html file in the 'data' folder that is a sibling of this source code in the directory tree.
		
		
		for book in range(1,num_items + 1):
			location = 'data/book' + str(book) + '.html'

			doc_reader = open(location,'r')
			document = doc_reader.read()
			soup = BeautifulSoup(document)  #Create the HTML tree from book page

			#Extracting contents from Amazon book pages
			#Other pages will likely require modification
			#This will need to be frequently maintained to ensure compatibility with current Amazon HTML format
			title = soup.find_all('span',id='btAsinTitle')[0].contents[0]
			author = soup.find_all('span', id='btAsinTitle')[0].find_parents("h1")[0].find_parents('div')[0].contents[3].find_all('a')[0].contents[0]
			try:
				#Standard Price
				price = soup.find_all('b','priceLarge')[0].contents[0]
			except IndexError:
			 	#Rental Price
			 	price = soup.find_all('table', id='rentalPriceBlockGrid')[0].find_all("div",text='Buy New')[0].find_parents('td')[0].contents[3].contents[0]
		
			
			isbn = soup.find_all('table', id='productDetailsTable')[0].find_all("b",text='ISBN-10:')[0].find_parents("li")[0].contents[1]
			

			weight = soup.find_all('table', id='productDetailsTable')[0].find_all("b",text='Shipping Weight:')[0].find_parents("li")[0].contents[1]
			match = re.search('[0-9]*\.[0-9]*',weight)
			weight = float(match.group())

			#Create a new book with attributes as calculated above and add to unsorted list.
			new_book = Book(title,author,price+' USD',isbn[1:],weight)
			self.books.append(new_book)

	def package_books(self):
		#Explanation of algorithm --
		#1) Sort books from heaviest to lightest
		#2) For each book picked up in order, check if it fits in an existing box. If it does, put it in. If not, make a new box and put there

		
		#First sort the books by weight
		self.books = sorted(self.books,key = lambda book: book.weight)
		
		#Place the heaviest book into the first crate and remove from unsorted books
		mycrate = Crate(1)
		mycrate.add_book(self.books[-1])
		self.crates.append(mycrate)
		self.books.pop(-1)
		
		#Iterate backwards through list and start assigning to boxes
		for book in reversed(self.books):
			
			book_sorted = False
			for crate in self.crates:
				
				#Will book fit in crate?
				if (book.get_weight() <= 10 - crate.total_weight()) and book_sorted is False: 
					crate.add_book(book)
					book_sorted = True

			#If it doesn't fit in any previous boxes, make a new one for it.		
			if book_sorted is False:
				new_crate = Crate(len(self.crates) + 1)
				new_crate.add_book(book)
				self.crates.append(new_crate)

		

	def ship_boxes(self):
		#Create list of JSON-ready dictionaries representing boxes
		crates_for_shipment = []
		for box in self.crates:
			crates_for_shipment.append(box.get_package())

		return json.dumps(crates_for_shipment,sort_keys = False, indent=4,separators=(',',': '))	
			


class Crate:
	#Crate objects will have members id, a list of books, and a total weight member

	def __init__(self,id):

		self.id = id
		self.totalWeight=0.0
		self.books = []

	def add_book(self,book):
		self.books.append(book)
		self.totalWeight = book.get_weight() + self.totalWeight

	#Not used here but good to have!
	def num_items(self):
		return len(self.books)


	def get_package(self):

		packaged_books = []

		for book in self.books:
			packaged_books.append(book.package())

		return {"id":self.id,"totalWeight":str(self.totalWeight)+' pounds',"contents":packaged_books}


	def total_weight(self):
		return self.totalWeight	

class Book:
	#This is relatively self-explanatory

	def __init__(self,title,author,price,isbn,weight):

		self.title = title
		self.author = author
		self.price = price
		self.isbn = isbn
		self.weight = weight
		

	def get_weight(self):
		return self.weight

	def get_price(self):
		return self.price	

	def package(self):
		return {"title":self.title,"author":self.author,"price":self.price,"shipping_weight":str(self.weight)+' pounds',"isbn-10":self.isbn}


#Main Method ----------------------------------------------------------------------------------------

#Creating a new book warehouse
shipping_warehouse = warehouse()

#Get shipment of books
shipping_warehouse.get_shipment(20)

#Sort and package books into boxes
shipping_warehouse.package_books()

#Ship 'em out!
print shipping_warehouse.ship_boxes()
