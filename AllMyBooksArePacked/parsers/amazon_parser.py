import re

from .base_parser import BaseParser


class AmazonParser(BaseParser):
    """
    AmazonParser houses the implementation for parsing out desired information.
    """

    def parse_all_info(self, beautiful_soup_obj):
        """
        Extract all of the desired information from a html page and return a
        dictionary containing the information.

        :param beautiful_soup_obj: A pre-parsed beautiful soup object.
        :rtype: dict
        :return: A structure containing all of our required fields.
        """
        return {
            'title': self.parse_title(beautiful_soup_obj).text,
            'author': self.parse_author(beautiful_soup_obj),
            'price': self.parse_price(beautiful_soup_obj),
            'shipping_weight': float(self.parse_shipping_weight(beautiful_soup_obj)),
            'isbn-10': self.parse_isbn10(beautiful_soup_obj),
        }

    def parse_title(self, beautiful_soup_obj):
        """
        Extracts an Amazon book title from a beautiful soup object.

        :param beautiful_soup_obj: A pre-parsed beautiful soup object.
        :rtype: BeautifulSoupQuery
        :return: A beautiful soup query object which has not yet been
        converted to string.
        """
        return beautiful_soup_obj.find('span', id='btAsinTitle')

    def parse_author(self, beautiful_soup_obj):
        """
        Extracts a book's author. Because of how amazon structures their data,
        we can use the queried title object and use it to find the author's
        name.

        :param beautiful_soup_obj: A pre-parsed beautiful soup object.
        :rtype: str
        :return: An Amazon book's author
        """
        title = self.parse_title(beautiful_soup_obj)
        return title.find_next('a', href=True).text

    def parse_price(self, beautiful_soup_obj):
        """
        Extracts an Amazon book price from a beautiful soup object.

        :param beautiful_soup_obj: A pre-parsed beautiful soup object.
        :rtype: str
        :return: An Amazon book price
        """
        try:
            return beautiful_soup_obj.find('b', {'class': 'priceLarge'}).text
        except AttributeError:
            return beautiful_soup_obj.find(
                    'td',
                    {'class': 'price'},
            ).text.strip()

    def parse_shipping_weight(self, beautiful_soup_obj):
        """
        Extracts an Amazon book weight from a beautiful soup object.

        :param beautiful_soup_obj: A pre-parsed beautiful soup object.
        :rtype: str
        :return: An Amazon book weight.
        """
        list_items = beautiful_soup_obj.find(
                'b',
                text=re.compile('Shipping Weight'),
        )
        try:
            return list_items.parent.contents[1].split(' ')[1]
        except IndexError:
            # Realistically we'd want better error handling here, but if I ever
            # explicitly index like this and it can fail, I'd rather put the
            # exception just in case.
            return '0.0'

    def parse_isbn10(self, beautiful_soup_obj):
        """
        Extracts an ISBN-10 number.

        :param beautiful_soup_obj: A pre-parsed beautiful soup object.
        :rtype: int
        :return: An ISBN-10 number.
        """
        # TODO(ian): This needs to resolve any ISBN issues, as I was seeing some
        # with an `X` at the end.
        list_items = beautiful_soup_obj.find('b', text=re.compile('ISBN-10'))
        try:
            return list_items.parent.contents[1]
        except IndexError:
            # Realistically we'd want better error handling here, but if I ever
            # explicitly index like this and it can fail, I'd rather put the
            # exception just in case.
            return 'XXXXXXXXX'
