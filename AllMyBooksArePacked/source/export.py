# Datafiniti - DataFizz challenge
# json export module file
#

import json
import os

# module imports
import container
import item


def export_json(container_list, fname):
    """Takes in list of containers and iterates through to create
    structured json
    """
    json_doc = {"boxes": []}

    print "Building JSON file..."
    for container in container_list:
        item_list = container.get_inventory()
        contents = []
        for item in item_list:
            contents.append({
                "title": item.get_title(),
                "author": item.get_author(),
                "price": item.get_price() + " USD",
                "shipping_weight": str(item.get_weight()) + " pounds",
                "isbn-10": item.get_isbn()
            })
        json_doc["boxes"].append({
            "id": container.get_id(),
            "totalWeight": str(container.get_weight()) + " pounds",
            "contents": contents
        })

    print "Writing JSON file to: " + os.getcwd()
    with open(fname, 'w') as json_file:
        json.dump(json_doc, json_file, sort_keys=True,
                  indent=4, separators=(',', ': '))
