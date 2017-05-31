import logging
import multiprocessing as mp
from os import listdir, path
from pprint import PrettyPrinter
import re
import sys

from parser import ProductParser
from shipping import Shipper

logger = logging.getLogger("books")
stdout = logging.StreamHandler(sys.stdout)
logger.addHandler(stdout)
logger.setLevel(logging.DEBUG)

def get_files():
    curr_dir = path.dirname(path.realpath(__file__))
    data_dir = path.join(curr_dir, 'data')
    file_re = re.compile(r'book\d+\.html')
    return [path.join(data_dir, f) for f in listdir(data_dir) if path.isfile(path.join(data_dir, f)) and file_re.match(f)]

def scrape(f):
    with open(f, encoding='latin-1') as input_file:
        p = ProductParser(input_file.read())
        return p.product

def get_products():
    workers = 2 * mp.cpu_count()
    with mp.Pool(workers) as pool:
        products = pool.map(scrape, get_files())
        return [p for p in products if p is not None]

def main():
    products = get_products()
    boxes = Shipper(products)
    logger.debug('JSON: {boxes}'.format(boxes=repr(boxes)))

def main2():
    products = []
    for f in get_files():
        logger.debug('processing file: {f}'.format(f=f))
        with open(f, encoding='latin-1') as input_file:
            p = ProductParser(input_file.read())
            if hasattr(p, 'product'):
                logger.debug(p.product)
                products.append(p.product)
    boxes = Shipper(products)
    logger.debug('JSON: {boxes}'.format(boxes=repr(boxes)))

if __name__ == '__main__':
    main()


