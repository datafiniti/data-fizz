
class myBook(object):
	_title = "Error"
	_author = "Error"
	_isbn = "Error"
	_weight = "Error"
	_price = ["Error"]
	i = 0;

	def getTitle(self):
		return self._title
	def getAuthor(self):
		return self._author
	def getIsbn(self):
		return self._isbn
	def getWeight(self):
		return self._weight
	def getPrice(self):
		return self._price

	def setTitle(self, title):
		self._title = title
	def setAuthor(self, author):
		self._author =author
	def setIsbn(self, isbn):
		self._isbn =isbn
	def setWeight(self, weight):
		self._weight = weight
	def setPrice(self, price):
		self._price = price
	