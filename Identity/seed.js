'use strict';

var chance = require('chance')(123);
var Promise = require('bluebird');

var db = require('./server/db');
var User = require('./server/api/users/user.model');

var numUsers = 10;

var emails = chance.unique(chance.email, numUsers);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randUser () {
  return User.build({
    first_name: chance.first(),
    last_name: chance.last(),
    email: emails.pop(),
    password: chance.word(),
  });
}


function generateUsers () {
  var users = doTimes(numUsers, randUser);
  users.push(User.build({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    password: '123'
  }));
   return users;
}


function createUsers () {
  return Promise.map(generateUsers(), function (user) {
    return user.save();
  });
}


function seed () {
  return createUsers()
}

db.sync({force: true})
.then(function () {
  return seed();
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.then(function () {
  process.exit();
});
