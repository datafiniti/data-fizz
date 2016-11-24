'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/browser/login/login.html',
    controller: 'LoginCtl'
  });
});

app.controller('LoginCtl', function($scope, $http, $state, $rootScope){
	$scope.submitLogin = function(){
		$http.post('/login', {
			email: $scope.emailInput,
			password: $scope.passwordInput
		})
		.then(function(res){
			$rootScope.currentUser = res.data
		})
		.then(function(){
			$state.go('home')
		}, function(err){
			alert("Opps email or password is not matching please try again")
		}
	)}
})