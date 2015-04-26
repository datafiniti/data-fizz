# Datafiniti - DataFizz challenge
# container module file
#


class Box(object):
    class_counter = 1

    def __init__(self, max_weight):
        if not isinstance(max_weight, float):
            raise AttributeError("max_weight must be a float")
        self.max_weight = max_weight
        self.scaled_max = int(max_weight * 100)
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
        if int((self.get_weight()+book.get_weight())*100) <= self.scaled_max:
            self.inventory.append(book)
            self.weight += book.get_weight()
        else:
            print "Not enough space in box: ", book.get_title()
