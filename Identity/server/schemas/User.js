var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

module.exports = mongoose.model('User', new Schema({ 
   	email: String, 
    password: String,
    sessions: Array,
    invalidSessions: Array
}));