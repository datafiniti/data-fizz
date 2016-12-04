import bookParser 
import fileFinder
import Book
import Packer



class Main(object):
    # Create an object that will parse our files
    Parser = bookParser.Parser()

    # Create  an array that will be filled with Book objects
    # Parsing function will parse an html book and return a Book object with the parsed data
    bookCollection = []

    # files will contain a list of all the html documents that need parsing
    files = fileFinder.ReadFiles().read()

    # Iterate over all html documents, pass the documents to the Parsing function,
    # and place the returned Book object in the BookCollection list
    for file in files:
        Book = Parser.parseAll('data/' + file)
        bookCollection.append(Book)

    # Now that we have all the parsed data in the Book Collection list,
    # Pass data to Packing function
    # Packing function will return the shipping boxes filled with our book objects
    myBoxes = Packer.myPacker().pack(bookCollection)

    for box in myBoxes:
        print("$$")
        for book in box:
            print(book.getWeight())
        




