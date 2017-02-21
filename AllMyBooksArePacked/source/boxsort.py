# Datafiniti - DataFizz challenge
# boxsort module file
#

import container
import item


class BoxSortLogic(object):
    """Main sort alogrithm for box sorting - optimal speed"""

    def __init__(self, books, max_weight):
        if not isinstance(books, list):
            raise AttributeError("Books must be a list")
        self.books = books

        if not isinstance(max_weight, float):
            raise AttributeError("max_weight must be a float")
        self.max_weight = max_weight
        self.scaled_max = int(max_weight * 100)

    def sort_books(self):
        """Linear sort algorithm, fills boxes up till can't hold then
        starts new box (no optimization)
        """
        boxes = []
        box = container.Box(self.max_weight)
        current_len = len(self.books)

        print "Data sort beginning..."
        while current_len > 0:
            item = self.books[current_len - 1]
            poss_weight = int(round((box.get_weight()+item.get_weight())*100))
            if poss_weight > self.scaled_max:
                boxes.append(box)
                box = container.Box(self.max_weight)
            else:
                box.add_book(item)
                current_len -= 1
        boxes.append(box)

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
        if item_list == [] or avail <= 0:
            return (0, ())
        else:
            next_item = self.books[item_list[0]]
            next_weight = int(round(next_item.get_weight() * 100))
            num_index = "".join(str(num) for num in item_list)
            memo_key = (num_index, avail)

        # determine if already ran computation
        if memo_key in self.memo:
            result = self.memo[memo_key]
        # explore right branch of tree only
        elif next_weight > avail:
            result = self.best_val(item_list[1:], avail)
        # choose which branch is better
        else:
            # explores left branch
            with_weight, with_weight_list =\
                self.best_val(item_list[1:], avail - next_weight)
            with_weight += next_weight
            # explores right branch
            without_weight, without_weight_list =\
                self.best_val(item_list[1:], avail)
            # compares both branches
            if with_weight > without_weight:
                result = (with_weight, with_weight_list + (item_list[0],))
            else:
                result = (without_weight, without_weight_list)

        # add new calculation to memo
        self.memo[memo_key] = result
        return result

    def sort_books(self):
        """Sort logic for dynamic programming sort.  Calls best_val to
        determine optimal book storage for one box at a time.
        """
        boxes = []
        current_len = len(self.books)
        temp_books = [x for x in xrange(current_len)]

        # iterate through current list of books, extracting as many each time
        print "Dynamic sort beginning..."
        while current_len > 0:
            box = container.Box(self.max_weight)
            books_added = self.best_val(temp_books, self.scaled_max)
            if len(books_added[1]) > 0:
                current_len -= len(books_added[1])
                for index in books_added[1]:
                    box.add_book(self.books[index])
                    temp_books.remove(index)
            else:
                break
            boxes.append(box)

        #return list of boxes with books sorted
        return boxes
