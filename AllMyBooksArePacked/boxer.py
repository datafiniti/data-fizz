class Box(object):
    def __init__(self, *args, **kwargs):
        # These really don't need to be books. They could be anything that
        # follows a specific interface that we define with specific properties.
        # In this case for our situation we only need shipping weight.
        self.books = []
        # Each box can only handle 10 lbs.
        self.weight_limit = 10

    def current_weight(self):
        return sum(b.shipping_weight for b in self.books)

    def fits(self, book):
        if (book.shipping_weight + self.current_weight()) <= self.weight_limit:
            return True
        return False

    def pack(self, book):
        if self.fits(book):
            self.books.append(book)
            return True
        return False

class Boxer(object):
    def __init__(self, *args, **kwargs):
        # We need at least 1 box.
        self.boxes = [Box()]

    def __pack(self, book):
        for b in self.boxes:
            if b.pack(book):
                # Packed book so, there is nothing else to do.
                return True
        # If we get here we didn't find a box that the book fits into.
        box = Box()
        self.boxes.append(box)
        return box.pack(book)

    def pack(self, books):
        """Packs books into a box or boxes for shipping.

        This is a bin packing problem, thus NP-complete. 

        From the 'Algorithm Design Manual':

            "Analytical and empirical results suggest that 
            ‘first fit decreasing’ is the best heuristic. Sort the objects in 
            decreasing order of size, so that the biggest object is first and 
            the smallest last. Insert each object one by one in to the first bin 
            that has room for it."

        Args:
            books: A list of Amazon Book objects.
        Returns:
            A list of books that we can't fit into our boxes.
        """
        # Sort the books by weight descending.
        unpacked_books = []
        sorted_books = sorted(books, key=lambda x: x.shipping_weight, reverse=True)
        for b in sorted_books:
            if not self.__pack(b):
                unpacked_books.append(b)
        return unpacked_books
