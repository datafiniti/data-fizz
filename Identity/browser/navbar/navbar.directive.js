'use strict';

app.directive('navbar', function ($state, $location, $http, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/browser/navbar/navbar.html',
    link: function (scope) {
      scope.goToSignup = function (){
      	$state.go('signup')
      }, function(err){console.error(err)},

   	  scope.goToLogin = function (){
      	$state.go('login')
      }, function(err){console.error(err)},

      scope.submitLogout = function (){
        $http.delete('logout')
        .then(function(){
          $rootScope.currentUser = null
        })
        .then(function(){
          $state.go('home')
        }, function(err){console.error(err)})
      }
    }
  }
});
