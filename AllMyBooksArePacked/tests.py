#!/usr/bin/env python

from nose.tools import assert_equals
from scrapers.amazon import Book
from scrapers import amazon

def test_new_book():
    b = Book(title="The Algorithm Design Manual", 
        shipping_weight=1.2,
        price=99.99,
        isbn10='abcdefghij',
        author='Skiena')
    assert(b.title == "The Algorithm Design Manual")
    assert(b.isbn10 == 'abcdefghij')
    assert(b.author == 'Skiena')
    assert(b.shipping_weight == 1.2)
    assert(b.price == 99.99)

def test_basic_parse():
    book = amazon.parse(open('./data/book1.html', encoding='ISO-8859-1'))
    assert_equals(book.title, 'Zealot: The Life and Times of Jesus of Nazareth')
    assert_equals(book.shipping_weight, 1.2)
    assert_equals(book.price, 16.89)
    assert_equals(book.isbn10, '140006922X')
    assert_equals(book.author, 'Reza Aslan')
