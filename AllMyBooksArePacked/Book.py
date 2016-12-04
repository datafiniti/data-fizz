import re

class myBook(object):
	_title = "Error"
	_author = "Error"
	_isbn = "Error"
	_weight = "Error"
	_weight_val = 0
	_price = ["Error"]

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
	