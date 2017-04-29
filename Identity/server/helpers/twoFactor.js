import fs from 'fs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import handlebars from 'handlebars';
import userModel from '../models/users';

const User = userModel.User;

export async function handleTwoFactor(user) {
    let token;

    crypto.randomBytes(20, (err, buf) => {
        token = buf.toString('hex');
    });

    try {
        let tokenedUser = await giveUserToken(user, token);
        return sendUserToken(user, token);
    } catch (err) {
        return err;
    }
}
function giveUserToken(user, token) {
    User.findOne({_id: user._id}, (err, user) => {
        user.twoFactorToken = token;
        user.twoFactorExpires = Date.now() + 6000;

        user.save((err, user) => {
            if (err) {
                return json.bad(err, res);
            }

            return user;
        });
    });
}

function sendUserToken(user, token) {
    let success; 

    const emailTemplate = fs.readFileSync('./server/templates/forgotPassword.html', {encoding: 'utf-8'});
    const template = handlebars.compile(emailTemplate);
    const replacements = {
        token: token,
    };
    const templateToSend = template(replacements);

    const mailTransport = nodemailer.createTransport({
        service: global.config.mailer.service,
        auth: {
            user: global.config.mailer.auth.user,
            pass: global.config.mailer.auth.pass,
        },
    });

    const mailOptions = {
        to: user.email,
        from: 'Identity',
        subject: 'Your auth code',
        html: templateToSend,
    };

    mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        } else {
            success = true;
            return success;
        }
    });
}