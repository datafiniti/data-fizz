'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/js/templates/home.html'
  });
  $stateProvider.state('signUp', {
    url: '/signUp',
    templateUrl: '/js/templates/signUp.html'
  });
  $stateProvider.state('signIn', {
    url: '/signin',
    templateUrl: '/js/templates/signIn.html'
  });
  $stateProvider.state('updateEmail', {
    url: '/updateEmail',
    templateUrl: '/js/templates/updateEmail.html'
  });
    $stateProvider.state('pwRetrieve', {
        url: '/pwRetrieve',
        templateUrl: '/js/templates/pwRetrieve.html'
  });
  $stateProvider.state('changePw', {
        url: '/changePw',
        templateUrl: '/js/templates/changePw.html'
    });
  $stateProvider.state('activeDevices', {
        url: '/activeDevices',
        templateUrl: '/js/templates/activeDevices.html'
  });
});