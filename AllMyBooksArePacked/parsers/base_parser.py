

class BaseParser(object):
    """
    BaseParser houses our base parser object from which we can extend and
    create new parsers for any other site which we may need.

    There is an assumption in this design that, for any child class of
    BaseParser, we'll want to extract at least the title, the author, the price,
    the shipping weight and the ISBN-10. However, this isn't actually an issue,
    as if a child class opts to not parse, for example, isbn10, there is no
    error in not implementing a `parse_isbn10` method. There will only be an
    issue if a child class attempts to access a `self.parse_isbn10` method, in
    which case our `NotImplementedError` will be raised.
    """

    __abstract__ = True

    def __init__(self):
        pass

    def parse_all_info(self, beautiful_soup_obj):
        """
        Extract all of the desired information from a html page and return a
        dictionary containing the information.

        :param beautiful_soup_obj: A pre-parsed beautiful soup object.
        :rtype: dict
        :return: A structure containing all of our required fields.
        """
        return {
            'title': self.parse_title(beautiful_soup_obj),
            'author': self.parse_author(beautiful_soup_obj),
            'price': self.parse_price(beautiful_soup_obj),
            'shipping_weight': self.parse_shipping_weight(beautiful_soup_obj),
            'isbn-10': self.parse_isbn10(beautiful_soup_obj),
        }

    def parse_title(self, html_data):
        raise NotImplementedError(
            'BaseParser.parse_title must be implemented by child classes before'
            'being called.'
        )

    def parse_author(self, html_data):
        raise NotImplementedError(
            'BaseParser.parse_author must be implemented by child classes '
            'before being called.'
        )

    def parse_price(self, html_data):
        raise NotImplementedError(
            'BaseParser.parse_price must be implemented by child classes before'
            'being called.'
        )

    def parse_shipping_weight(self, html_data):
        raise NotImplementedError(
            'BaseParser.parse_shipping_weight must be implemented by child '
            'classes before being called.'
        )

    def parse_isbn10(self, html_data):
        raise NotImplementedError(
            'BaseParser.parse_isbn10 must be implemented by child classes '
            'before being called.'
        )

