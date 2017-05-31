import logging

from bs4 import BeautifulSoup

from product import Product

logger = logging.getLogger("books")

class ProductParser:
    def __init__(self, raw_html):
        self.raw_html = raw_html
        self.error = False
        self.__parse()

    def __get_title(self):
        title = self.html.find(id='btAsinTitle').find(text=True, recursive=False)
        return str(title)

    def __get_author(self):
        author = self.html.find(id='btAsinTitle').parent.parent.find('a').text
        return str(author)

    def __get_price(self):
        first_look = self.html.find(id='actualPriceValue')
        second_look = self.html.find('td', class_="buyNewOffers")
        if first_look:
            price = first_look.string
        elif second_look:
            price = second_look.find(class_='rentPrice').string
        else:
            raise Except('no price element found')

        replace_chars = {
            '$': '',
            ',': ''
        }
        for old, new in replace_chars.items():
            price = price.replace(old, new)
        return float(price)
            
    def __get_isbn10(self):
        for li in self.html.find(id='productDetailsTable').find_all('li'):
            list_entry = li.b.text
            if list_entry == 'ISBN-10:':
                isbn10 = li.find(text=True, recursive=False)
                return str(isbn10)
    
    def __get_weight(self):
        for li in self.html.find(id='productDetailsTable').find_all('li'):
            list_entry = li.b.text
            if list_entry == 'Shipping Weight:':
                weight_node = li.find(text=True, recursive=False)
                weight = weight_node.rstrip('(').strip().split(' ')[0]
                return float(weight)

    def __parse(self):
        try:
            self.html = BeautifulSoup(self.raw_html, 'html.parser')
            title = self.__get_title()
            author = self.__get_author()
            price = self.__get_price()
            isbn10 = self.__get_isbn10()
            weight = self.__get_weight()
            self.product = Product(title, author, price, weight, isbn10)
        except Exception:
            self.error = True
            self.product = None
            logger.exception('failed parsing')






