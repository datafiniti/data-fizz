import bookParser 
import fileFinder
import Book




class Main(object):
	Parser = bookParser.Parser()
	bookCollection = []
	sortedBookCollection = []

	files = fileFinder.ReadFiles().read()
	for file in files:
  		Book = Parser.parseAll('data/' + file)
  		bookCollection.append(Book)

  	bookCollection = sorted(bookCollection, key=lambda myBook: myBook.getWeight())
  	for books in bookCollection:
  		print(books.getWeight())
  	
  	




