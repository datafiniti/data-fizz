# Datafiniti - DataFizz challenge
# parser module file
#

import os
import re

import item


class SiteParser(object):

    def __init__(self, location):
        self.location = location

        # test if local directory
        if os.access(location, os.F_OK):
            self.data_list = os.listdir(location)
        else:
            raise IOError("Not a viable location")

    def get_data_list(self):
        return self.data_list

    def read_html_file(self):
        """Reads in html data file and extracts book data"""
        item_list = []

        print "Parsing HTML files..."
        for html_file in self.data_list:
            html_file = self.location + html_file
            try:
                html_fhandler = open(html_file, 'r')
            except IOError:
                print "Bad file:", html_file
            html_data = html_fhandler.read()
            item_list.append(self.extract_book(html_data))

        print "Parse complete."
        return item_list

    def extract_book(self, html_data):
        """ Extracts data to build book object from Amazon HTML"""
        book_object = None

        ## regex to extract Title
        title = re.findall('btAsinTitle.+?>(.+?)<', html_data)
        title = title[0].strip()
        # print "Title:", title, type(title)

        ## regex to extract Author
        author = re.findall('>(.+?)</a.*byLinePipe', html_data)
        author = author[0].strip()
        # print "Author:", author, type(author)

        ## regex to extract Weight, convert to float
        weight = re.findall('Weight:</b>\s(\d*\.\d)\s.+?<', html_data)
        weight = float(weight[0])
        # print "Weight:", weight, type(weight)

        ## regex to extract price
        price = re.findall('"bb_price">\n(.+?)\s', html_data)
        price = price[0].strip()
        # print "Price:", price, type(price)

        ## regex to extract ISBN-10
        isbn = re.findall('ISBN-10:</b>\s([A-Z0-9.]+?)<', html_data)
        isbn = isbn[0].strip()
        # print "ISBN-10:", isbn, type(isbn)

        ## build book object with extracted data
        book_object = item.Book(title, author, price, weight, isbn)

        return book_object
