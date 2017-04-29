import mongoose from 'mongoose';
import json from '../helpers/json';
import messagesModel from '../models/messages';

module.exports = () => {
    const Messages = messagesModel.Messages;
    const obj = {};

    obj.create = (req, res) => {
        if (req.body.participants) {
            req.body.participants.sort((a, b) => {
                return a < b;
            });
        }

        let criteria = {};

        if (req.body.messageId) {
            criteria = {
                _id: req.body.messageId,
            };
        } else {
            criteria = {
                participants: req.body.participants,
            };
        }

        Messages.findOne(criteria)
        .populate('creator')
        .populate('participants')
        .populate('entries')
        .populate('entries.creator')
        .exec((err, message) => {
            if (err) {
                return json.bad(err, res);
            } else if (message) {
                message.doAccess(req.user);
                message.calculateUnread();
                message.save((err) => {
                    if (err) {
                        return json.bad(err, res);
                    }

                    json.good({
                        record: message,
                    }, res);
                });
            } else {
                const message = new Messages(req.body);
                message.creator = req.user._id;

                req.body.participants.map((userId) => {
                    message.doAccess({_id: userId});
                });

                message.save((err) => {
                    if (err) {
                        return json.bad(err, res);
                    }

                    json.good({
                        record: message,
                    }, res);
                });
            }
        });
    };

    obj.sendMessage = (req, res) => {
        Messages.findOne({_id: req.params.messageId})
        .populate('creator')
        .populate('participants')
        .populate('entries')
        .populate('entries.creator')
        .exec((err, message) => {
            if (err) {
                return json.bad(err, res);
            } else if (message) {
                message.entries.unshift({
                    body: req.body.messageBody,
                    creator: req.user._id,
                });

                message.doAccess(req.user);
                message.calculateUnread();
                message.save((err, message) => {
                    message.populate('entries entries.creator', (err, message) => {
                        json.good({
                            record: message,
                        }, res);
                    });
                });
            } else {
                return json.bad({
                    message: 'Sorry, that message could not be found',
                }, res);
            }
        });
    };

    obj.addParticipant = (req, res) => {
        Messages.findOne({_id: req.params.messageId})
        .populate('creator')
        .exec((err, message) => {
            if (err) {
                return json.bad(err, res);
            }

            message.participants.push(req.body.userId);
            message.save((err) => {
                if (err) {
                    return json.bad(err, res);
                }

                json.good({
                    record: message,
                }, res);
            });
        });
    };

    obj.markRead = (req, res) => {
        Messages.findOne({_id: req.params.messageId})
        .populate('creator')
        .populate('participants')
        .populate('entries')
        .populate('entries.creator')
        .exec((err, message) => {
            if (err) {
                return json.bad(err, res);
            }

            message.lastAccessed.map((item) => {
                if (req.user._id === item.user.toString()) {
                    item.unread = 0;
                }
            });

            message.save((err) => {
                if (err) {
                    return json.bad(err, res);
                }

                json.good({
                    record: message,
                }, res);
            });
        });
    };

    obj.list = (req, res) => {
        let user = req.user;
        let criteria = {
            participants: req.user,
        };

        if (req.query && req.query.timestamp) {
            criteria.created = {
                $gte: req.query.timestamp,
            };
        }

        if (req.query && req.query.filter) {
            delete criteria.created;
            criteria.entries.entry[0] = new RegExp(req.query.filter, 'i');
        }

        Messages.find(criteria, null, {sort: {modified: 1}})
        .populate('creator')
        .populate('participants')
        .populate('entries')
        .populate('entries.creator')
        .skip(parseInt(req.query.page) * global.config.settings.perPage)
        .limit(global.config.settings.perPage + 1)
        .exec((err, messages) => {
            if (err) {
                return json.bad(err, res);
            } else {
                messages.map((message) => {
                    message.calculateUnreadFor(req.user);
                });

                let morePages = global.config.settings.perPage < messages.length;

                if (morePages) {
                    messages.pop();
                }

                json.good({
                    messages: messages,
                    morePages: morePages,
                }, res);
            }
        });
    };

    obj.single = (req, res) => {
        Messages.findOne({_id: req.params.messageId})
        .populate('creator')
        .populate('participants')
        .populate('entries')
        .populate('entries.creator')
        .exec((err, message) => {
            if (err) {
                return json.bad(err, res);
            } else if (chat) {
                return json.bad({
                    message: message,
                }, res);
            } else {
                return json.bad({
                    message: 'Sorry, that chat could not be found',
                }, res);
            }
        });
    };

    return obj;
};