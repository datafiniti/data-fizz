import bookParser 
import fileFinder
import Book
import Packer
import json


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
        #a = ""
        #for book in box:
        #    f = dict(book)
        #    a = json.dumps(f, indent = True)
        #print (a)

        #f = dict(box)
        #a = json.dumps(f,indent=True)
        #print (a)

        print("new box")
        box.setTotalWeight()
        f = box.getContents()
        l = []
        for book in f:
            j = dict(book)
            a = json.dumps(j, indent = True)
            l.append(a)
        print(l)




        #print("$$")
        #for book in box:
        #    print(book.getWeight())
        




