var knapsack = require('knapsack-js');
var HashMap = require('hashmap');

exports.getBox = function (items, capacity) {
    var arrbox = [];
    var boxcant = 1;
    while (items.length > 0) {
        var _items = [];
        items.forEach(function (element) {
            var item = JSON.parse('{"' + element.id + '": ' + parseFloat(element.shipping_weight.split(" ")[0]) + '}');
            _items.push(item);
        }, this);
        var _knapsack = knapsack.resolve(capacity, _items);
        var _box = generateBox(_knapsack, items, boxcant);
        boxcant++;
        var b = {};
        b.box = _box;
        arrbox.push(b);
        items = removeShippedBoox(_knapsack, items);
    }
    return arrbox;

};


function ParseJSON(jsonitem) {
    var _jsonarray = JSON.stringify(jsonitem).replace(/{|"|}/gi, "").trim().split(":");
    return _jsonarray;
};

function generateBox(items, books, id) {
    var box = {};
    box.id = id;
    box.totalWeight = 0;
    box.contents = [];

    items.forEach(function (knapsack_item) {
        var _continue = true;
        books.forEach(function (element) {
            if (_continue) {
                if (element.id === ParseJSON(knapsack_item)[0]) {
                    box.contents.push(element);
                    box.totalWeight += parseFloat(element.shipping_weight.split(" ")[0]);
                    _continue = false;
                }
            }
        }, this);
    }, this);

    box.totalWeight = box.totalWeight + " pounds";
    return box;

};

function removeShippedBoox(items, books) {
    var contents = [];
    var noshipped = true;



    books.forEach(function (element) {
        items.forEach(function (knapsack_item) {
            if (element.id === ParseJSON(knapsack_item)[0]) {
                noshipped = false;
            }
        }, this);
        if (noshipped) {
            contents.push(element);
        } else {

            noshipped = true;
        }

    }, this);

    return contents;
};

