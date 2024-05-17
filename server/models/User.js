const { Schema, model, Types } = require('mongoose');

const conversationSchema = new Schema({
    userComment: { type: String ,required: true},
    currentUserComment: { type: String },
})

const noticeSchema = new Schema({
    fromUser: {
        type: Types.ObjectId, ref: 'User'
    },
    aboutProduct: {
        type: Types.ObjectId, ref: 'Item'
    },
    conversation: [conversationSchema]
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
        minLength: [1, 'First name must be at least 1 characters'],
    },
    lastname: {
        type: String,
        required: true,
        minLength: [1, 'Last name must be at least 1 characters'],
    },

    hashedPassword: {
        type: String,
        required: true,
    },

    notices: [noticeSchema]
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;