'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: '/browser/signup/signup.html',
    controller: 'SignupCtl'
  });
});

app.controller('SignupCtl', function($scope, $http, $state, $rootScope){
	$scope.submitSignup = function(){
		$http.post('/signup', {
			first_name: $scope.firstInput,
			last_name: $scope.lastInput,
			email: $scope.emailInput,
			password: $scope.passwordInput
		})
		.then(function(res){
			$rootScope.currentUser = res.data
		})
		.then(function(){
			$state.go('home')
		}, function(err){
			console.log(err)
		}
	)}
})