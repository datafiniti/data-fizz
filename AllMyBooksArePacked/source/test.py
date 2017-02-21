# Datafiniti - DataFizz challenge
# test module file
#

import os
import random

# modules to test
import item
import parser
import container
import export
import boxsort

# test globals
BOOK_ONE = item.Book("Turing's Cathedral", "George Dyson",
                     '$13.66', 7.9, "1400075998")
BOX_ONE = container.Box(10.0)


def test_parser():
    """Tests directory search and parsing html data"""
    # data = os.getcwd() + "/da"
    # clean_data = parser.SiteParser(data)
    data = os.path.dirname(os.getcwd()) + "/data/"
    clean_data = parser.SiteParser(data)
    print type(clean_data)
    print clean_data.get_data_list()
    print clean_data.read_html_file()


def test_book():
    """Uses mock book created and tests methods"""
    print type(BOOK_ONE)
    print BOOK_ONE.ship_weight
    print BOOK_ONE.get_title()
    print BOOK_ONE.get_price()
    print BOOK_ONE.get_isbn()
    print BOOK_ONE.get_author()


def test_box():
    """Uses mock box and book created and tests container methods"""
    print type(BOX_ONE)
    print BOX_ONE.get_id()
    print BOX_ONE.get_weight()
    BOX_ONE.add_book(BOOK_ONE)
    print BOX_ONE.get_weight()
    print BOX_ONE.get_inventory()


def test_export():
    """Tests JSON export on mock box"""
    export.export_json([BOX_ONE], "oneboxtest.txt")


def test_boxsort(logic='linear'):
    """Tests sorting logic depending on user specifying linear
        or dynamic.  Will export data in JSON file.
    """
    BOOK_1 = item.Book("one", "", "", 1.0, "XXXXXXXXXX")
    BOOK_2 = item.Book("two", "", "", 3.0, "XXXXXXXXXX")
    BOOK_3 = item.Book("three", "", "", 4.0, "XXXXXXXXXX")
    BOOK_4 = item.Book("four", "", "", 2.0, "XXXXXXXXXX")
    BOOK_5 = item.Book("five", "", "", 3.0, "XXXXXXXXXX")
    BOOK_6 = item.Book("six", "", "", 5.0, "XXXXXXXXXX")
    BOOK_7 = item.Book("seven", "", "", 2.0, "XXXXXXXXXX")
    BOOK_8 = item.Book("eight", "", "", 4.0, "XXXXXXXXXX")
    test_books = [BOOK_1, BOOK_2, BOOK_3, BOOK_4,
                  BOOK_5, BOOK_6, BOOK_7, BOOK_8]
    if logic == 'linear':
        boxes = boxsort.BoxSortLogic(test_books, 5.0)
    elif logic == 'dynamic':
        boxes = boxsort.DynamicBoxSort(test_books, 5.0)
    else:
        raise NameError("Specify linear or dynamic for logic")
    container_list = boxes.sort_books()
    export.export_json(container_list, "boxtest.txt")


def test_large_dataset(seed):
    """Creates large book data set and test sorting logic"""
    random.seed(seed)
    book_list = []
    weight_linear, weight_dynamic = 0, 0
    for x in xrange(1, 101):
        weight = round(random.triangular(low=0, high=10), 2)
        book = item.Book(str(x), "", "", weight, "XXXXXXXXXX")
        book_list.append(book)
    boxes_linear = boxsort.BoxSortLogic(book_list, 10.0)
    containers_linear = boxes_linear.sort_books()
    for box in containers_linear:
        weight_linear += box.get_weight()
    print "Linear boxes created: ", str(len(containers_linear))
    print "Linear weight average: ", weight_linear/len(containers_linear)
    boxes_dynamic = boxsort.DynamicBoxSort(book_list, 10.0)
    containers_dynamic = boxes_dynamic.sort_books()
    for box in containers_dynamic:
        weight_dynamic += box.get_weight()
    print "Dynamic boxes created: ", str(len(containers_dynamic))
    print "Dynamic weight average: ", weight_dynamic/len(containers_dynamic)


if __name__ == '__main__':
    #test_book()
    #test_box()
    #test_parser()
    #test_export()
    #test_boxsort('dynamic')
    test_large_dataset(101)
