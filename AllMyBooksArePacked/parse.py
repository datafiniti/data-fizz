# coding = utf-8
import re

amz_price = '<span class="bb_price">\s*(?P<price>[^<\s]+)?\s*</span>'
amz_title = '<span id="btAsinTitle"\s*>(?P<title>[^<]+)?<span.*?>.+?</span>\s*</span>\s*</h1>'
amz_author = '\s*<span\s*>\s*<a.+?>(?P<author>[^<]+)?</a>'
amz_weight = 'Shipping Weight:\s*</b>\s*(?P<weight>.+)?\('
amz_isbn = 'ISBN-10:\s*</b>\s*(?P<isbn10>\d{9}\w)'
amz_pricer = re.compile(amz_price, re.I | re.U)
amz_title_author = re.compile(amz_title+amz_author, re.I | re.U)
amz_sw = re.compile(amz_weight, re.I | re.U)
amz_isbn10 = re.compile(amz_isbn, re.I | re.U)

def amazon_book(html):
    p = amz_pricer.search(html)
    ta = amz_title_author.search(html)
    w = amz_sw.search(html)
    isbn_10 = amz_isbn10.search(html)
    book = {
        "title": ta.group("title").strip(),
        "author": ta.group("author"),
        "price": "{} USD".format(p.group("price")),
        "shipping_weight": w.group("weight").strip(),
        "isbn-10": isbn_10.group('isbn10')
    }
    return book
