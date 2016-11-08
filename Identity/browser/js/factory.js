'use strict';

app.factory('UsersFactory', function ($http, SessionsFactory) {

  var UsersFactory = {};

  UsersFactory.addUser = function (newUser) {
    return $http.post('/api/users/addUser', newUser)
    .then(function (response) { 
    	return response; 
    });
  };

  UsersFactory.userLogIn = function(givenUser){
  	return $http.get('api/users/login', {params: givenUser})
  	.then(function(loggedInUser){
      return loggedInUser;
  	});
  };

  UsersFactory.pwReset = function(userInfo){
  	return $http.put('api/users/pwreset', userInfo)
  	.then(function(response){
  		return response;
  	});
  };
  UsersFactory.pwUpdate = function(userInfo){
    return $http.put('api/users/pwUpdate', userInfo)
    .then(function(response){
      return response;
    });
  };
  UsersFactory.updateEmail = function(user){
    return $http.put('api/users/emailreset', user)
    .then(function(response){
      return response;
    });
  };

  return UsersFactory;

});

app.factory('SessionsFactory', function($http) {
  var SessionsFactory = {};

  SessionsFactory.activeSessions = function(userInfo){
    return $http.get('api/sessions/activeSessions', {params: userInfo})
    .then(function(allSessions){
      return allSessions;
    });
  };
  SessionsFactory.verifySession = function(sessionInfo){
    return $http.get('api/sessions/verifySession',{params: sessionInfo})
    .then(function(verifiedSession){
      return verifiedSession;
    });
  };
  SessionsFactory.newSession = function(userInfo){
    return $http.post('api/sessions/newSession', {email: userInfo.email, deviceType: userInfo.deviceType})
    .then(function(newSession){
      return newSession;
    });
  };
  SessionsFactory.updateUserEmail = function(userInfo){
    return $http.put('api/sessions/updateUserEmail', userInfo)
    .then(function(updatedSessions){
      return updatedSessions;
    });
  };
  SessionsFactory.signOut = function(sessionInfo){
    return $http.delete('api/sessions/signOut', {params: sessionInfo})
    .then(function(response){
      return response;
    });
  };

  return SessionsFactory;

});
