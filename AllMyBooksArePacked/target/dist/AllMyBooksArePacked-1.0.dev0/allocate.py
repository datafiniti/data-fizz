from extract import extract
from collect import collect_to
import json

books = extract(20)
scaled_weights = [int(book['shipping_weight']*10) for book in books]

boxes = []

i=1
while(len(scaled_weights)):
    (box, books, scaled_weights) = collect_to(i, books, scaled_weights)
    boxes.append(box)
    i+=1

print json.dumps({'boxes': boxes}, sort_keys=True, indent=4, separators=(',', ': '))
