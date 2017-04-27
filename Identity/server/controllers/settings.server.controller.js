import mongoose from 'mongoose';
import json from '../helpers/json';
import model from '../models/settings';


module.exports = () => {
    const Settings = model.Settings;
    const obj = {};

    obj.get = (req, res) => {
        if (req.user) {
            Settings.findOne({creator: req.user._id}, (err, setting) => {
                if (err) {
                    return json.bad(err, res);
                }

                json.good({
                    setting: setting,
                }, res);
            });
        } else {
            return json.bad({
                message: 'Sorry, you are not authorized. Try logging in again',
            }, res);
        }
    };

    obj.update = (req, res) => {
        Setting.findOne({creator: req.user._id}, (err, setting) => {
            if (err) {
                return json.bad(err, res);
            }

            setting.twoFactorAuth = req.body.twoFactorAuth || setting.twoFactorAuth;
            setting.textAuthentication = req.body.textAuthentication || setting.textAuthentication;

            setting.save((err, item) => {
                if (err) {
                    return json.bad(err, res);
                }

                json.good({
                    item: item,
                }, res);
            });
        });
    };

    return obj;
};