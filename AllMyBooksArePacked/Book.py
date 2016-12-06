import re

class myBook(object):
	# If you make any changes in these variables
	# Make sure you update next() function
	_title = "Error"
	_author = "Error"
	_isbn = "Error"
	_weight = "Error"
	_weight_val = 0
	_price = "Error"
	_counter = 0


	def __iter__(self):
		self._counter=0;
		return self

	def next(self):
		if(self._counter==5):
			raise StopIteration
		elif(self._counter==0):
			self._counter += 1
			return ("title" ,self._title)
		elif(self._counter==1):
			self._counter += 1
			return ("author" ,self._author)
		elif(self._counter==2):
			self._counter += 1
			return ("isbn" ,self._isbn)
		elif(self._counter==3):
			self._counter += 1
			return ("weight" ,self._weight)
		elif(self._counter==4):
			self._counter += 1
			return ("price" ,self._price)


	def getTitle(self):
		return self._title
	def getAuthor(self):
		return self._author
	def getIsbn(self):
		return self._isbn
	def getWeight(self):
		return self._weight
	def getWeightVal(self):
		return self._weight_val
	def getPrice(self):
		return self._price

	def setTitle(self, title):
		self._title = title
	def setAuthor(self, author):
		self._author =author
	def setIsbn(self, isbn):
		self._isbn =isbn

	# Need to do calculations with weight value
	# weight input has form "x.y Pounds"
	# used regex to store floating point "x.y" in _weight_val 

	def setWeight(self, weight):
		self._weight = weight
		self._weight_val = float(re.search('[^ ]*',weight, flags = 0).group())

	def setPrice(self, price):
		self._price = price
	