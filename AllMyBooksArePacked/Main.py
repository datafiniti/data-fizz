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
        if (box is not None):
            box.setTotalWeight()
            books = box.getContents()
            list_of_contents = []
            #iterate over all the books in the box to get the contents of the box
            for book in books:
               my_book = dict(book)
               list_of_contents.append(my_book)
            weight = box.getTotalWeight();
            my_id = box.getId();
            json_object = json.dumps({"box": {"id":my_id,"totalWeight": weight,"contents" : list_of_contents}}, indent = True)
            print(json_object)




