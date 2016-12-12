import re
import glob
import json

class Book:
    # represents a book, and contains full dictionary of details obtained from running parsing procedure.
    
    def __init__(self):
        self.title = None
        self.author = None
        self.price = None
        
    def parser(self,FILE):
        # begin parser
        with open(FILE,'r') as f:

            #read-in line-by-line so that file size is a moot point.
            t = f.readline()        
            while t != '':

                # title, author, isbn-13 switch cases
                # isbn-13 can be skipped here - see match details below
                match0 = re.match('<title>(.*):(.*):.*: Amazon.com: Books</title>',t)
                match1 = re.match('<title>Amazon.com: (.*) \(.*\): (.*): Books</title>',t)

                # price matching - needs work. Move on to box packing
                match2 = re.match('(\$\d.*\d*\.\d{2})',t)
                
                # match details switch case
                # pattern matches to give a proper key-pair without difficult parsing
                # <li><b>KEY:</b>VALUE</li>
                match3 = re.match('<li><b>\s*(.*):</b>\s*(.*)</li>',t)

                # the switch
                if match0:
                    self.title, self.author =  match0.groups()
                elif match1:
                    self.title, self.author =  match1.groups()
                elif match2:
                    self.price = '%s USD' % match2.groups() # happens to match for data9 by happenstance... going with it.
                elif match3:
                    key, value = match3.groups()

                    # need special case for shipping weight... go figure.
                    if key.lower() == 'shipping weight':
                        value = re.match('(\d*\.\d* pounds).*', value).groups()[0]

                    # just assign the key value pair to the class dict when found
                    self.__dict__[key.lower().replace(' ','_')] = value
                    
                t = f.readline()

            # html correction - others should be included if needed.
            self.title = self.title.replace('&#39;','\'')

    def getWeight(self):
        return float(self.shipping_weight.split(' ')[0])

class Box:
    # representation of a single box - initially empty
    
    def __init__(self,id):
        self.id = id
        self.totalWeight = None
        self.contents = []

    def addContent(self,book):
        item = {k: book.__dict__[k] for k in ['title','author','price','shipping_weight','isbn-10']}
        self.contents.append(item)

class Packer:
    # method to create the box list! What this has all built up to!

    def __init__(self):
        self.boxes = []
        self.books = []

    def getBooks(self,FILES):
        for FILE in FILES:
            book = Book()
            book.parser(FILE)
            self.books.append(book)

    def sortBooks(self):
        books = sorted(self.books,
                       key = lambda book: book.shipping_weight,
                       reverse = True)

        id, i, j = 1, 0, len(books)-1
        i_weight = books[i].getWeight()
        j_weight = books[j].getWeight()
        totalWeight = 0
        box = Box(id)
        
        while i < j:
            print i,j

            if (i_weight + j_weight) > 10:
                print 'case 1'
                box.addContent(books[i])
                box.totalWeight = i_weight
                #print box.__dict__
                self.boxes.append(box.__dict__)
                #print self.boxes
                
                i += 1
                i_weight = books[i].getWeight()
                
                id += 1
                box = Box(id)
                #print box.contents

            elif (i_weight + j_weight) == 10:
                print 'case 2'
                box.addContent(books[i])
                box.addContent(books[j])
                box.totalWeight = i_weight + j_weight
                #print box.__dict__
                self.boxes.append(box.__dict__)
                #print self.boxes
                
                i += 1
                i_weight = books[i].getWeight()

                j -= 1
                j_weight = books[j].getWeight()

                id += 1
                box = Box(id)
                #print box.contents

                
            else:
                print 'case 3'
                box.addContent(books[j])
                #print box.__dict__
                #print self.boxes

                i_weight += j_weight

                j -= 1
                j_weight = books[j].getWeight()

                if i == j:
                    print 'case 3.a'
                    box.addContent(books[i])
                    box.totalWeight = i_weight
                    self.boxes.append(box.__dict__)
                    
            
        
FILES = glob.glob('data/*')

test = Packer()
test.getBooks(FILES)
test.sortBooks()

# print json.dumps(test.boxes, indent = 4)
