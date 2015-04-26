# Datafiniti - DataFizz challenge
# test module file
#

import os

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
    # data = os.getcwd() + "/da"
    # clean_data = parser.SiteParser(data)
    data = os.path.dirname(os.getcwd()) + "/data/"
    clean_data = parser.SiteParser(data)
    print type(clean_data)
    print clean_data.get_data_list()
    print clean_data.read_html_file()


def test_book():
    print type(BOOK_ONE)
    print BOOK_ONE.ship_weight
    print BOOK_ONE.get_title()
    print BOOK_ONE.get_price()
    print BOOK_ONE.get_isbn()
    print BOOK_ONE.get_author()


def test_box():
    print type(BOX_ONE)
    print BOX_ONE.get_id()
    print BOX_ONE.get_weight()
    BOX_ONE.add_book(BOOK_ONE)
    print BOX_ONE.get_weight()
    print BOX_ONE.get_inventory()


def test_export():
    export.export_json([BOX_ONE])
    return


def test_boxsort():
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
    # boxes = boxsort.BoxSortLogic(test_books, 5.0)
    boxes = boxsort.DynamicBoxSort(test_books, 5.0)
    container_list = boxes.sort_books()
    print container_list
    export.export_json(container_list)
    return

if __name__ == '__main__':
    test_book()
    test_box()
    test_parser()
    test_export()
    test_boxsort()
