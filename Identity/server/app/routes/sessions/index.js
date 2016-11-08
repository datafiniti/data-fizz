'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Sessions = require('../../../db').model('session');

router.get('/activeSessions', function(req, res){ //get a list of active session for an email address
    return Sessions.findAll({
        where: {
            email: req.query.email
        }
    })
    .then(function(sessions){
    	res.send(sessions);
    });
});
router.get('/verifySession', function(req, res){
    return Sessions.findOne({
        where: {
            id: req.query.sessionId,
            token: req.query.token,
            email: req.query.email
        }
    })
    .then(function(session){
        res.send(session);
    })
    .catch(function(err){
        res.send(err);
    });
});
router.post('/newSession', function(req, res){
    return Sessions.create({
        email: req.body.email,
        deviceType: req.body.deviceType
    })
    .then(function(session){
        res.send(session);
    })
    .catch(function(err){
        res.send(err);
    });
});
router.put('/updateUserEmail', function(req, res){
    return Sessions.update({
        email: req.body.newEmail
    }, {
        where: {
          email: req.body.oldEmail
         }
    })
    .then(function(updatedSessions){
        res.send(updatedSessions);
    })
    .catch(function(err){
        res.send(err);
    });
});
router.delete('/signOut', function(req, res){ //delete session instance based on session id and email address
    return Sessions.destroy({
    	where: {
    		email: req.query.email,
    		id: req.query.sessionId,
            token: req.query.token
    	}
    })
    .then(function(deletedSession){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.send(err);
    });
});