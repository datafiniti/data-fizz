# Datafiniti - DataFizz challenge
# container module file
#


class Box(object):
    class_counter = 1

    def __init__(self):
        self.box_id = Box.class_counter
        Box.class_counter += 1

        self.weight = 0.0
        self.inventory = []

    def get_id(self):
        return self.box_id

    def get_weight(self):
        return self.weight

    def get_inventory(self):
        return self.inventory

    def add_book(self, book):
        if self.get_weight() + book.get_weight() < 10.0:
            self.inventory.append(book)
            self.weight += book.get_weight()
        else:
            return "Not enough space in box"
