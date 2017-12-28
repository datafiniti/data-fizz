(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$http', 'KnapsackService'];

  function MainCtrl($scope, $http, KnapsackService) {

    $scope.item = {};
    $scope.items = [];
    $scope.jumbotron = true;
    $scope.showScrapeDetails = false;
    $scope.loading = false;
    $scope.showBoxes = false;
    $scope.gotScrapeResults = false;
    $scope.alertContain = false;
    var books_stack_array = [];
    // List data html files
    $http.get('/api/data').then(function(data){
      $scope.files = data.data;
    });

    $scope.scrapeBook = function(book){
      console.log(book);
      $scope.loading = true;
      $http.post('/api/scrape', {
        book: book
      }).then(function(data) {
          $scope.jumbotron = false;
          $scope.showScrapeDetails = true;
          $scope.gotScrapeResults = true;
          $scope.item.title = data.data.title;
          $scope.item.author = data.data.author;
          $scope.item.price = data.data.price;
          $scope.item.isbn10 = data.data.isbn10;
          $scope.item.shipping_weight = data.data.shipping_weight;
          $scope.item.image = data.data.image;
          $scope.items.splice(0, 0, data.data);
          // console.log($scope.items);
        }, function (error) {
          console.log('failed to return from scrape', error);
          $scope.loading = false;
          $scope.gotScrapeResults = false;
        })
        .finally(function () {
          $scope.loading = false;
        });
    };

    $scope.shipping = function(){
      $scope.boxes = {
        box: KnapsackService.getBoxes($scope.items, 10)
      };
      $scope.showBoxes = true;
    };

    $scope.packAll = function () {
      var stack = [];
      $scope.loading = true;
      for (let id = 1; id <= 20; id++) {
        $http.post('/api/stack', {
          id: id
        })
        .then(function (data) {
          $scope.jumbotron = false;
          stack.push(data.data);
          $scope.items = stack;
        }).finally(function () {
          $scope.loading = false;
        });
      }
    };

    $scope.clear = function(){
      $scope.jumbotron = true;
      $scope.showBoxes = false;
    }
  }
})();