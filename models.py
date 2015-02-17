class Shipment:
    def __init__(self):
        pass


    def sort_books_by_weight(books):
        return sorted(books, key=lambda book: book.weight, reverse=True)


    def create_shipment(books):
        pass



class Box:
    def __init__(self, *books):
        pass


class Book:
    def __init__(self, title, author, price, ISBN, weight):
        self.title = title
        self.author = author
        self.price = price
        self.ISBN = ISBN
        self.weight = weight


    def __repr__(self):
        return "{0} by {1}".format(self.title, self.author)
