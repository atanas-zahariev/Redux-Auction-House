const { Schema, model, Types } = require('mongoose');


const notificationsSchema = new Schema({
    incomingMessage: {
        type: String,
        required: true,
        minLength: [3, 'Your message must be at least 3 characters.'],
        maxLength: [200, 'Your message must be at most 200 characters.']
    },

    product: { type: Types.ObjectId, ref: 'Item', required: true },

    user: { type: Types.ObjectId, ref: 'User', required: true }

});

const Notifications = model('Notifications', notificationsSchema);

module.exports = Notifications;