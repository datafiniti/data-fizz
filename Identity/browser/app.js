'use strict';
var app = angular.module('identity', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
});

app.run(function($http, $rootScope){
	$http.get('/me')
	.then(function(theUser){
		$rootScope.currentUser = theUser
	})
})

