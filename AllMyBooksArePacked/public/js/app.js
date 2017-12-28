(function(){
  'use strict'

  angular
    .module('app', [
      'ui.router'
    ])
    .config(config)
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
    function config($stateProvider, $urlRouterProvider, $locationProvider){
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: '../partials/main.html',
          controller: 'MainCtrl'
        })
        $urlRouterProvider.otherwise('/')
        $locationProvider.html5Mode(true)
    }
})();