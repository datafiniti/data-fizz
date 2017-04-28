import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import crypto from 'crypto';
import fs from 'fs';
import async from 'async';
import userModel from '../models/users';
import settingsModel from '../models/settings';
import json from '../helpers/json';
import { generateToken, decodeToken } from '../helpers/auth';
import { handleTwoFactor } from '../helpers/twoFactor';

module.exports = () => {
    const User = userModel.User;
    const Settings = settingsModel.Settings;
    const obj = {};

    obj.create = (req, res) => {
        let roles = ['authenticated'];

        User.count({}, (err, len) => {
            if (!len) {
                roles.push('admin');
            }

            const user = new User(req.body);
            user.toles = roles;
            user.token = generateToken(user);
            user.lastLogin = Date.now();
            user.loggedIn = true;

            const settings = new Settings();
            settings.creator = user._id;
            settings.save((err) => {
                if (err) {
                    return json.bad(err, res);
                }

                user.settings = settings;
                user.save((err) => {
                    if (err) {
                        return json.bad(err, res);
                    }

                    json.good({
                        record: user,
                        token: user.token,
                    }, res);
                });
            });
        });
    };

    obj.authenticate = (req, res) => {
        User.findOne({email: req.body.email})
        .populate('settings')
        .exec((err, user) => {
            if (err) {
                return json.bad(err, res);
            }
            
            if (!user || typeof user === 'null') {
                return json.bad({
                    message: 'Sorry, there is no user with that email/password combination',
                }, res);
            }

            if (user.isLocked) {
                return user.incorrectLoginAttempts((err) => {
                    if (err) {
                        return json.bad(err, res);
                    }

                    json.bad({
                        message: `Sorry, you have reached the maximum number of login attempts and your account is locked until: ${user.lockUntil}`,
                    }, res);
                });
            }

            if (user.secureLock) {
                return json.bad({
                    message: 'Sorry, your account is has been locked indefinitely due to failed login attempts. If you feel this was malicious or in error, please contact us to resolve this',
                }, res);
            }

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    return json.bad(err, res);
                }

                if (isMatch) {
                    if (user.loggedIn) {
                        user.notifications.push({
                            notificationType: 'login',
                            body: 'Someone has just tried to login to your account',
                        });

                        return user.save((err) => {
                            json.bad({
                                message: 'That account is already logged in',
                                type: 'loggedIn',
                            }, res);
                        });
                    }

                    if (!user.loginAttempts && !user.lockUntil && !user.secureLock) {
                        if (user.settings.twoFactorAuth) {
                            return handleTwoFactor(user)
                            .then((result) => {
                                if (result) {
                                   console.log(result);
                                }
                            });
                        } 

                        user.token = generateToken(user);
                        user.lastLogin = Date.now();
                        user.loggedIn = true;

                        return user.save((err) => {
                            json.good({
                                record: user,
                                token: user.token,
                            }, res);
                        });
                    }

                    let updates = {
                        $set: {
                            loginAttempts: 0,
                            limitReached: 0,
                        },

                        $unset: { lockUntil: 1 }
                    };

                    return user.update(updates, (err, item) => {
                        if (user.settings.twoFactorAuth) {
                            return handleTwoFactor(user)
                            .then((result) => {
                                if (result) {
                                    console.log('woot');
                                }
                            });
                        }
                        user.token = generateToken(user);
                        user.lastLogin = Date.now();
                        user.loggedIn = true;
                        
                        if (err) {
                            return json.bad(err, res);
                        }

                        user.save((err) => {
                            return json.good({
                                record: user,
                                token: user.token,
                            }, res);
                        });
                    });                   
                }

                user.incorrectLoginAttempts((err) => {
                    let totalAttempts;

                    if (err) {
                        return json.bad(err, res);
                    }

                    if (user.limitReached >= 2) {
                        totalAttempts = 3;
                    } else {
                        totalAttempts = 5;
                    }

                    json.bad({message: `Sorry, either your email or password were incorrect. You have ${totalAttempts - user.loginAttempts} remaining until your account is locked`}, res);
                });               
            });
        });
    };

    obj.logout = (req, res) => {
        User.findOne({_id: req.params.userId}, (err, user) => {
            if (err) {
                return json.bad(err, res);
            }

            user.loggedIn = false;
            user.token = undefined;

            user.save((err) => {
                if (err) {
                    return json.bad(err, res);
                }

                json.good({
                    record: user,
                }, res);
            });
        });
    };

    obj.forgot = (req, res) => {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, (err, buf) => {
                    const token = buf.toString('hex');
                    done(err, token);
                });
            },

            function (token, done) {
                User.findOne({email: req.params.email}, (err, user) => {
                    if (err) {
                        return json.bad(err, res);
                    }

                    if (!user || typeof user === 'null') {
                        return json.bad({
                            message: `Sorry, there isn't a user with that email`,
                        }, res);
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save((err) => {
                        done(err, token, user);
                    });
                });
            },

            function (token, user, done) {
                let emailTemplate = fs.readFileSync('./server/templates/forgotPassword.html', {encoding: 'utf-8'});
                let template = handlebars.compile(emailTemplate);
                let replacements = {
                    token: user.resetPasswordToken,
                    user: user.name,
                };
                let templateToSend = template(replacements);
                

                let mailTransport = nodemailer.createTransport({
                    service: global.config.mailer.service,
                    auth: {
                        user: global.config.mailer.auth.user,
                        pass: global.config.mailer.auth.pass,
                    },
                });

                let mailOptions = {
                    to: user.email,
                    from: 'Identity',
                    subject: 'Your password Reset',
                    html: templateToSend,
                };

                mailTransport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        json.bad(error, res);
                    } else {
                        json.good(info.response, res);
                    }
                });
            }
        ], (err) => {
            let success = true;

            if (err) {
                return json.bad(err, res);
            }

            json.good({
                record: success,
            }, res);
        });
    };

    obj.reset = (req, res) => {
        User.findOne({resetPasswordToken: req.body.token}, (err, user) => {
            if (err) {
                return json.bad(err, res);
            }

            if (!user || typeof user === 'null') {
                return json.bad({
                    message: 'Sorry, that reset token is incorrect'
                }, res);
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save((err) => {
                if (err) {
                    return json.bad(err, res);
                }

                json.good({
                    record: user,
                }, res);
            });
        });
    };

    return obj;   
};
