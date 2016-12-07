import json
import math


class WeightPacker(object):
    def __init__(self, bucket_list, weight_limit=10):
        self.weight_limit = weight_limit
        self.buckets = bucket_list
        self.boxes = []

        self.box_weight = 0
        # I don't think shipping companies take kindly to 0 indexing.
        self.current_box_index = 1
        self.current_box = {'box_id': self.current_box_index,
                            'contents': []}

    def add_book(self, book_info):
        """
        A completely ugly way of sorting books into boxes. I was working on a
        solution to using my buckets system, but I hit my 4 hour time limit and
        decided to just implement _something_... _anything_ which would solve
        the rest of the problem.

        :param dict book_info: The book info parsed out via a parser.
        """
        index = int(math.floor(book_info['shipping_weight']))

        if self.box_weight + book_info['shipping_weight'] >= self.weight_limit:
            if index == self.weight_limit - 1:
                self.boxes.append(
                    # Create  a new box, and append the json info of the new
                    # book to the book shipping list
                    self._new_box()['contents'].append(json.dumps(book_info))
                )
                self.current_box_index += 1
                self.current_box['box_id'] = self.current_box_index
                return

            else:
                self.boxes.append(self.current_box)
                self.current_box_index += 1
                self.current_box = self._new_box()

                self.add_book_to_box(book_info)

        else:
            self.add_book_to_box(book_info)

    def add_book_to_box(self, book_info):
        """
        Handles adding a book into the current box and updating necessary info.
        :param dict book_info: Book info passed in from a parser.
        :return:
        """
        self.box_weight += book_info['shipping_weight']
        self.current_box['contents'].append(book_info)

    def _new_box(self):
        """
        Helper function to create a new box structure.

        :rtype: dict
        :return: A new box, represented as {'box_id': <int>,
        'content:' [<book_info>]}
        """
        return {
            'box_id': self.current_box_index,
            'contents': [],
        }
