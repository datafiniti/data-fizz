class Book:
    def __init__(self, title, author, price, ISBN, weight):
        self.title = title
        self.author = author
        self.price = price
        self.ISBN = ISBN
        self.weight = weight


    def __repr__(self):
        return "{0} by {1}".format(self.title, self.author)
