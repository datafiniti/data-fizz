from json import dumps

class Box:
    id_gen = 0

    def __init__(self):
        Box.id_gen += 1
        self.box_id = Box.id_gen
        self.products = []
        self.weight = 0

    def add_products(self, products):
        if isinstance(products, list):
            self.products.extend(products)
        else:
            self.products.append(products)
        self.weight = sum([p.weight for p in self.products])

class Shipper:

    def __init__(self, products):
        self.products = products
        self.boxes = []
        self.__sort_products()
        self.__create_boxes()

    def __repr__(self):
        _boxes = {'boxes': []}
        for box in self.boxes:
            _box = {
                'id': box.box_id,
                'totalWeight': box.weight,
                'contents': []
            }
            for product in box.products:
                _product = {
                    'title': product.title,
                    'author': product.author,
                    'price': '${price:.2f} USD'.format(price=product.price),
                    'shipping_weight': product.weight,
                    'isbn-10': product.isbn10
                }
                _box['contents'].append(_product)
            _boxes['boxes'].append(_box)
        return dumps(_boxes, indent=4)

    def __sort_products(self):
        max_runs = len(self.products)
        for i in range(1, max_runs):
            current_product_weight = self.products[i].weight
            for j in range(0, i):
                comparison_product_weight = self.products[j].weight
                if current_product_weight < comparison_product_weight:
                    self.products.insert(j, self.products.pop(i))
                    break
    
    def __create_boxes(self):
        self.__sort_products()

        max_weight = 10 #lbs
        final = len(self.products) - 1
        curr_weight = 0
        next_batch = []

        for i, prod in enumerate(self.products):
            would_be_weight = curr_weight + prod.weight
            if would_be_weight > max_weight:
                box = Box()
                box.add_products(next_batch)
                self.boxes.append(box)
                curr_weight = prod.weight
                next_batch = [prod]
            else:
                curr_weight += prod.weight
                next_batch.append(prod)

        # if last item didn't fit in box
        if next_batch:
            box = Box()
            box.add_products(next_batch)
            self.boxes.append(box)
            
