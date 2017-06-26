import os
import json
import packer

path = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(path, 'output.json'), 'r') as f:
    boxes = json.load(f)

    def content_weight(box):
        return sum([packer.weight(book) for book in box['contents']])

    num_tests = 0
    num_passes = 0

    for box in boxes:
        num_tests += 1
        box_weight = content_weight(box)
        weights_match = box_weight == float(box['totalWeight'].split()[0])
        if weights_match and box_weight <= 10:
            print "Pass"
            num_passes += 1
        else:
            "Fail: Box is too heavy, or sum of contents does not match 'totalWeight'"

    print "{} / {} tests passed".format(num_passes, num_tests)
