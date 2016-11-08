'use strict';

app.controller('Users', function ($scope, UsersFactory, SessionsFactory, $state, $stateParams) {
	$scope.checkSession = function(){
		var session = {sessionId: localStorage.getItem('sessionId'), token: localStorage.getItem('token'), email: localStorage.getItem('email')};
		if(session.sessionId && session.token && session.email){
			SessionsFactory.verifySession(session) //check that session id and token are correct
			.then(function(session){
				if(!session.data){
					localStorage.clear();//if incorrect, clear local storage
					$scope.activeUser = null; 
				} else { //if session info is correct
					$scope.activeUser = session.data;	
					$scope.retrieveSessions(session.data);
				}
			});
		}
	};
	$scope.checkSession();
	$scope.activeUser;
	$scope.sessionlist;
	$scope.loggedIn = function(){
		return localStorage.getItem('email');
	};
	$scope.addUser = function(user){
		UsersFactory.addUser(user)
		.then(function(newUser){
				if(newUser.status==201){
					newUser.data.deviceType = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) ? 'mobile' : 'desktop/laptop';
					return SessionsFactory.newSession(newUser.data);
				} else {
					alert('Email already in use, please sign in.');
					$state.go('signIn'); //send error message
					throw new Error('email in use')
				}
		})
		.then(function(newSession){
				var tempUser = newSession.data;
				localStorage.setItem('sessionId', tempUser.id);
				localStorage.setItem('token', tempUser.token);
				localStorage.setItem('email', tempUser.email);
				$scope.activeUser = tempUser;
				$scope.retrieveSessions(tempUser);	
				$state.go('home');
		});
	};
	$scope.userLogIn = function(user){
		UsersFactory.userLogIn(user)
		.then(function(loggedInUser){
			if(loggedInUser.data.email){
				loggedInUser.data.deviceType = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) ? 'mobile' : 'desktop/laptop';
				return SessionsFactory.newSession(loggedInUser.data);
			} else {
				alert('The email and/or password you provided is incorrect, please try again.');
				$state.go('signIn', {}, { reload: true });
				throw new Error('Credentials incorrect')
			}
		})
		.then(function(session){
				var tempUser = session.data;
				localStorage.setItem('sessionId', tempUser.id);
				localStorage.setItem('token', tempUser.token);
				localStorage.setItem('email', tempUser.email);
				$scope.activeUser = tempUser;	
				$scope.retrieveSessions(tempUser);
				$state.go('home');
		});
	};
	$scope.pwReset = function(user){
		UsersFactory.pwReset(user)
		.then(function(response){
			alert('Your password has been reset, please check your email.');
			$state.go('home');
		});
	};
	$scope.pwUpdate = function(user){
		user.email = localStorage.getItem('email');
		UsersFactory.pwUpdate(user)
		.then(function(response){
			if(response.data.email){
				alert('Your password has been successfully updated.');
				$state.go('home');
			} else {
				alert('The original password provided is incorrect, please try again.');
				$state.go('changePw', {},{reload: true});
			}			
		});
	};
	$scope.updateEmail = function(user){
		var newEmail = user.newEmail;
		var oldEmail = localStorage.getItem('email');
		user.oldEmail = localStorage.getItem('email');
		UsersFactory.updateEmail(user)
		.then(function(updatedUser){
			if(updatedUser.data.email){
				return SessionsFactory.updateUserEmail({oldEmail: oldEmail, newEmail: newEmail});					
			} else {
				alert('The original password provided is incorrect, please try again.');
				$state.go('updateEmail', {}, {reload: true});
				throw new Error('Credentials not correct.');
			}
		})
		.then(function(updatedSessions){
			localStorage.setItem('email', newEmail);
			$scope.activeUser.email = newEmail;
			alert('Your email has been successfully updated');
			$state.go('home');
		});
	};
	$scope.retrieveSessions = function(user){
		SessionsFactory.activeSessions(user)
		.then(function(response){
			$scope.sessionlist = response.data;
		});
	};
	$scope.signOut = function(){
		if(localStorage.length){
			var session = {sessionId: localStorage.getItem('sessionId'), token: localStorage.getItem('token'), email: localStorage.getItem('email')};
			SessionsFactory.signOut(session)
			.then(function(signOutStatus){
				$scope.activeUser = null;
				$scope.sessionlist = null;
				localStorage.clear();
				$state.go('signIn');
			});			
		}

	};
});
