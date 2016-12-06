
class ShippingBox(object):
	_id = 0
	_totalWeight = 0
	_contents =[]
	_counter = 0


	def __init__(self):
		self._contents = []

	def __iter__(self):
		self._counter=0;
		return self

	def next(self):
		if(self._counter==3):
			raise StopIteration
		elif(self._counter==0):
			self._counter += 1
			return ("id" ,self._id)
		elif(self._counter==1):
			self._counter += 1
			return ("total weight" ,self._totalWeight)
		elif(self._counter==2):
			self._counter += 1
			return ("contents" ,self._contents)
		
	def getId(self):
		return self._id
	def getTotalWeight(self):
		return self._totalWeight
	def getContents(self):
		return self._contents

	def setId(self, the_id):
		self._id = the_id
	def setTotalWeight(self):
		for book in self._contents:
			self._totalWeight += book.getWeightVal()
	def setContents(self, content):
		self._contents.append(content)
		




