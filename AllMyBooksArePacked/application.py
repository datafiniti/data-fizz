import os
import packer
import json

path = os.path.dirname(os.path.abspath(__file__))
book_dir = os.path.join(path, 'data')

with open(os.path.join(path, 'output.json'), 'w') as f:
    json.dump(packer.pack(book_dir, 10), f)
