class Book_Node(object):
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def __iter__(self):
        if self.left:
            for book in self.left:
                yield book
        yield self.data
        if self.right:
            for book in self.right:
                yield book

class Shelf(object):
    # Expects key to be a function that yields a numerical value
    def __init__(self, key):
        self.key = key
        self.root = None

    def add(self, book):
        if self.root is None:
            self.root = Book_Node(book)
        else:
            active = self.root
            while self.key(active.data) != self.key(book):
                if self.key(book) < self.key(active.data):
                    if not active.left:
                        active.left = Book_Node(book)
                    active = active.left
                else:
                    if not active.right:
                        active.right = Book_Node(book)
                    active = active.right

    def __iter__(self):
        if not self.root:
            return
        else:
            for book in self.root:
                yield book
