const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
    comment: { type: Types.ObjectId, ref: 'Notifications', required: true },
    fromUser:{ type: Types.ObjectId, ref: 'User', required: true }
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

    comments: [
        commentSchema
    ]
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;