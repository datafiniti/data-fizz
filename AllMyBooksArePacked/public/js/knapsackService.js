(function() {
  'use strict';

  angular
    .module('app')
    .factory('KnapsackService', KnapsackService);

  function KnapsackService() {
    var boxes = [];
    var Knapsack = {

      createBox : function(items, capacity, id) {
        var box = {
          id: id,
          totalWeight: 0,
          contents: []
        };
        while (items.length > 0) {
          if (box.totalWeight + items[0].shipping_weight <= capacity) {
            box.totalWeight += items[0].shipping_weight;
            box.contents.push(items.shift());
          } else {
            break;
          }
        }
        return box;
      },

      createBoxes : function(items, capacity) {
        var boxes = [];
        var id = 1;
        while (items.length > 0) {
          var b = {};
          b = this.createBox(items, capacity, id)
          boxes.push(b);
          id++;
        }
        return boxes;
      },
    
      getBoxes: function (items, capacity) {
        console.log(items);
        items.sort(function(a, b) { return a.shipping_weight < b.shipping_weight; });
        return this.createBoxes(items, capacity);
      }
    }

    return Knapsack;
  }
})();