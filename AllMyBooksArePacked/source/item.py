# Datafiniti - DataFizz challenge
# item module file
#


class Book(object):

    def __init__(self, title, author, price, ship_weight, isbn_10):
        if not isinstance(title, str):
            raise AttributeError("Title must be string")
        self.title = title

        if not isinstance(author, str):
            raise AttributeError("Author must be string")
        self.author = author

        if not isinstance(price, str):
            raise AttributeError("Price must be a string")
        self.price = price

        if not isinstance(ship_weight, float):
            raise AttributeError("Shipping weight must be a float")
        self.ship_weight = ship_weight

        if not isinstance(isbn_10, str) and len(isbn_10) != 10:
            raise AttributeError("ISBN-10 must be an 10 char string")
        self.isbn_10 = isbn_10

    def get_title(self):
        return self.title

    def get_author(self):
        return self.author

    def get_price(self):
        return self.price

    def get_weight(self):
        return self.ship_weight

    def get_isbn(self):
        return self.isbn_10
