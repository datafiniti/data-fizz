import os
import sys
import re

from bs4 import BeautifulSoup

class Book(object):
    """An Amazon book."""
    def __init__(self, *args, **kwargs):
        self.title = kwargs.get('title', None)
        self.author = kwargs.get('author', None)
        self.price = kwargs.get('price', None)
        self.shipping_weight = kwargs.get('shipping_weight', None)
        self.isbn10 = kwargs.get('isbn10', None)

def __find_author(soup):
    els = soup.select('#handleBuy > div > span > a')
    if len(els) > 0:
        return els[0].text.strip()
    return None

def __find_title(soup):
    el = soup.find(id='btAsinTitle')
    if el and len(el.contents) > 0:
        return el.contents[0].strip()
    return None

def __find_price(soup):
    # TODO: Find the pricing information in other situations. For example,
    # when it's out of stock or only available by 3rd party marketplace. The
    # pricing information is located in different places depending on the 
    # product listing type.
    els = soup.select('#rbb_bb_trigger > a > span.bb_price')
    if len(els) > 0:
        price = re.sub('[^0-9.]', '', els[0].text)
        try:
            return float(price)
        except ValueError:
            pass
    return None

def __find_shipping_weight(soup):
    el = soup.find(text=re.compile('Shipping Weight'))
    if el:
        li = el.find_parent('li')
        if li and len(li.contents) > 1:
            sw = re.sub('[^0-9.]', '', li.contents[1])
            try:
                return float(sw)
            except ValueError:
                pass
    return None

def __find_isbn10(soup):
    el = soup.find(text=re.compile('ISBN-10'))
    if el:
        li = el.find_parent('li')
        if li and len(li.contents) > 1:
            return li.contents[1].strip()
    return None

def parse(html, parser = 'html5lib'):
    soup = BeautifulSoup(html, parser)
    b = Book()
    b.title = __find_title(soup)
    b.author = __find_author(soup)
    b.price = __find_price(soup)
    b.shipping_weight = __find_shipping_weight(soup)
    b.isbn10 = __find_isbn10(soup)
    return b

