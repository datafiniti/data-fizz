class Book:
    """A simple book class. Contains title, author, price, weight, and ISBN-10"""
    def __init__(self, title, author, price, shipping_weight, isbn_10):
        self.title = title
        self.author = author
        self.price = price
        self.shipping_weight = shipping_weight
        self.isbn_10 = isbn_10
    
    def print_details(self):
        print "Title:", self.title
        print "Author:", self.author
        print "Price:", self.price
        print "Shipping Weight:", self.shipping_weight
        print "ISBN-10:", self.isbn_10
