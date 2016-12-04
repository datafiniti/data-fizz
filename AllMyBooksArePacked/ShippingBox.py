
class ShippingBox(object):
	#edit shipping box capacity here
	_id = 0
	_totalWeight = 0
	_title = ""
	_author = ""
	_isbn = ""
	_weight = ""
	_price = [""]

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




