import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now,
    },

    modified: {
        type: Date,
        default: Date.now,
    },

    lastAccessed: [{
        accessed: {
            type: Date,
            default: Date.now,
        },

        user: {
            mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },

        unread: Number,
    }],

    creator: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },

    unread: Number,

    entries: [{
        created: {
            type: Date,
            default: Date.now
        },

        creator: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User',
        },

        body: String,
    }],

    participants: [{
        type: monogose.Schema.ObjectId,
        required: false,
        ref: 'User',
    }],
});

messagesSchema.methods = {
    toJSON: function() {
        let obj = this.toObject();
        obj.creator.password = '';

        if (obj.entries.creator) {
            obj.entries.creator.password = '';
        }

        if (obj.lastAccessed.user) {
            obj.lastAccessed.user.password = '';
        }

        return obj;
    },

    calculateUnread: function() {
        let obj = this;
        obj.lastAccessed.map((access) => {
            access.unread = obj.entries.filter((msg) => {
                return msg.created > access.accessed;
            }).length;
        });
    },

    calculateUnreadFor: function(user) {
        let obj = this;
        obj.lastAccessed.map((access) => {
            if (access.user.toString() === user._id.toString()) {
                obj.unread = access.unread;
            }
        });
    },

    doAccess: function(user) {
        let message = this;
        let lastAccessedUpdated = false;

        message.lastAccessed.map((access) => {
            if (access.user.toString() === user._id.toString()) {
                access.accessed = Date.now();
                lastAccessedUpdated = true;
            }
        });

        if (!lastAccessedUpdated) {
            message.lastAccessed.push({
                user: user._id,
                accessed: Date.now(),
            });
        }
    },

    /* notifyUsers: function(data) {
        let chatMessage = data.chatMessage;

        let notification = {
            messageId: data.messageId,
            messageBody: data.messageBody,
            actorId: data.actorId,
            notificationType: data.type,
        };

        this.populate('creator participants', (err, message) => {
            messgage.participants.map((user) => {
                user.notify(notification);
            });
        });
    }, */
};

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = {
    Messages: Messages,
};