class Product:
    def __init__(self, title, author, price, weight, isbn10):
        self.title = title
        self.author = author
        self.price = price
        self.weight = weight
        self.isbn10 = isbn10

    def __repr__(self):
        output = 'Product(title= {title}, author= {author}, price= {price}, weight= {weight}, isbn-10= {isbn10})'
        return output.format(title=self.title, author=self.author, price=self.price, weight=self.weight, isbn10=self.isbn10)
