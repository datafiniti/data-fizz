import json

from packers.buckets.base_bucket import BaseBucket
from packers.pack_by_weight import WeightPacker
from parsers.amazon_parser import AmazonParser
from utils.file_handling import read_files_lazy, create_soup_object


def parse_amazon_files():
    """
    Loads amazon book info one at a time and yields the data back to the caller
    which is free to do with the data as they please. Currently it is just
    written to an output file.

    :rtype: dict
    :return: A dictionary containing all desired info (author, title, price,
    weight, &c.)
    """
    amazon_obj = AmazonParser()

    for file_handle in read_files_lazy():
        soup = create_soup_object(file_handle)
        yield amazon_obj.parse_all_info(soup)

if __name__ == '__main__':
    weight_limit = 10
    # Create a bucket list for the books to be placed into to later be sorted.
    bucket_list = [BaseBucket(x-1, x) for x in xrange(1, weight_limit + 1)]
    weight_packer = WeightPacker(bucket_list, weight_limit)

    with open('output.json', 'a+') as f:
        for book_info in parse_amazon_files():
            weight_packer.add_book(book_info)

        f.writelines(json.dumps(weight_packer.boxes, indent=2))

