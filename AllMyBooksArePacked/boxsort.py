# Datafiniti - DataFizz challenge
# boxsort module file
#

import container
import item


class BoxSortLogic(object):
    """Main sort alogrithm for box sorting - O(n), optimal speed"""

    def __init__(self, books, max_weight):
        if not isinstance(books, list):
            raise AttributeError("Books must be a list")
        self.books = books

        if not isinstance(max_weight, float):
            raise AttributeError("max_weight must be a float")
        self.max_weight = max_weight

    def sort_books(self):
        """Linear sort algorithm, fills boxes up till can't hold then
        starts new box (no optimization)
        """
        boxes = []
        box = container.Box()
        count = 0
        current_len = len(self.books)

        print "Data sort beginning..."
        while current_len > 0:
            item = self.books[current_len - 1]
            if box.get_weight() + item.get_weight() > self.max_weight:
                boxes.append(box)
                box = container.Box()
            else:
                box.add_book(item)
                current_len -= 1

        # return list of boxes with books sorted
        return boxes


class DynamicBoxSort(BoxSortLogic):
    """Dynamic sort algorithm for box sorting - optimal box space usage"""

    def __init__(self, books, max_weight):
        BoxSortLogic.__init__(self, books, max_weight)
        self.memo = {}

    def best_val(self, item_list, avail):
        """Recursive algorithm for building decision tree to determine
        best value amont weights of remaining books.

        Input:   item_list -> list of books
                 avail -> available weight in box (int)
        """
        next_item = self.books[item_list[0]]
        next_weight = int(next_item.get_weight() * 100)  # scaled like max

        # determine if already ran computation
        if tuple(item_list) in self.memo:
            result = self.memo[tuple(item_list)]
        # make sure items in list
        elif item_list == [] or avail <= 0:
            result = (0, ())
        # explore right branch of tree only
        elif next_weight > avail:
            result = self.best_val(item_list[1:], avail)
        # choose which branch is better
        else:
            # explores left branch
            opt_take_num, opt_take_list =\
                self.best_val(item_list[1:], avail - next_weight)
            opt_take_num += 1
            # explores right branch
            opt_nottake_num, opt_nottake_list =\
                self.best_val(item_list[1:], avail)
            # compares both branches
            if opt_take_num > opt_nottake_num:
                result = (opt_take_num, opt_take_list + (item_list[0],))
            else:
                result = (opt_nottake_num, opt_nottake_list)

        # add new calculation to memo
        self.memo[tuple(item_list)] = result
        return result

    def sort_books(self):
        """Sort logic for dynamic programming sort.  Calls best_val to
        determine optimal book storage for one box at a time.
        """
        boxes = []
        current_len = len(self.books)
        temp_books = [x for x in xrange(current_len)]
        scaled_max = int(self.max_weight * 100)

        # iterate through current list of books, extracting as many each time
        while current_len > 0:
            box = container.Box()
            books_added = self.best_val(temp_books, scaled_max)
            if books_added[0] > 0:
                current_len -= books_added[0]
                for index in books_added[1]:
                    box.add_book(self.books[temp_books.pop(index)])
            else:
                break
            boxes.append(box)

        #return list of boxes with books sorted
        return boxes
