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
        # select certain keys from book.
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
        # sort the books decending by shipping weight
        books = sorted(self.books,
                       key = lambda book: book.shipping_weight,
                       reverse = True)

        id, i, j = 1, 0, len(books)-1
        i_weight = books[i].getWeight() # heaviest book
        j_weight = books[j].getWeight() # lightest book
        totalWeight = 0
        box = Box(id) # make a box
        
        while i <= j:
            if (i_weight + j_weight) > 10:
                # case 1 - we can't add any more weight to the box
                box.addContent(books[i]) # add i to box
                box.totalWeight = '%s pounds' % i_weight # set weight for box
                self.boxes.append(box.__dict__) # add box to collection
                
                i += 1 # step i
                i_weight = books[i].getWeight() 
                
                id += 1 # step id for new box
                box = Box(id)

            elif (i_weight + j_weight) == 10:
                # case 2 - we make exactly a 10 lb box
                box.addContent(books[i]) # add i to box
                box.addContent(books[j]) # add j to box
                box.totalWeight = '%s pounds' % (i_weight + j_weight)  # set weight for box
                self.boxes.append(box.__dict__) # add box to collection
                
                i += 1 # step i
                i_weight = books[i].getWeight()

                j -= 1 # step j
                j_weight = books[j].getWeight()

                id += 1 # step id
                box = Box(id)
                
            else:
                # case 3 - box is still too light
                box.addContent(books[j]) # add j to box

                i_weight += j_weight # i_weight becomes 'running weight'
                box.totalWeight = '%s pounds' % i_weight 

                j -= 1 # step j
                j_weight = books[j].getWeight()

    def packingList(self):
        # need unique keys
        return {'box_%s' % box['id'] : box for box in self.boxes}

def main():
    FILES = glob.glob('data/*')

    test = Packer()
    test.getBooks(FILES)
    test.sortBooks()
    with open('boxes.json','w') as o:
        json.dump(test.packingList(), o, indent = 4)

if __name__ == '__main__':
    main()
