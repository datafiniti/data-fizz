var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Session = db.model('session');
var Promise = require('sequelize').Promise;
var Sequelize = require('sequelize');

var seedUsers = function () {

    var users = [
        {
            email: 'testing@datafiniti.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);
};
var seedSessions = function () {

    var sessions = [
        {
            email: 'testing@datafiniti.com',
            deviceType: 'mobile'
        },
        {
            email: 'testing@datafiniti.com',
            deviceType: 'desktop/laptop'
        },
        {
            email: 'obama@gmail.com',
            deviceType: 'mobile'
        },
        {
            email: 'obama@gmail.com',
            deviceType: 'desktop/laptop'
        }
    ];

    var creatingSessions = sessions.map(function (sessionObj) {
        return Session.create(sessionObj);
    });

    return Promise.all(creatingSessions);
};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })    
    .then(function(){
        return seedSessions();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
