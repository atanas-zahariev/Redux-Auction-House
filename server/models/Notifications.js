const { Schema, model, Types } = require('mongoose');

const answerSchema = new Schema({
    answer: {
        type: String,
        required: true,
        minLength: [3, 'Answer must be at least 3 characters.'],
        maxLength: [100, 'Answer must be at most 100 characters.']
    },
    user: { type: Types.ObjectId, ref: 'User', required: true }
});

const notificationsSchema = new Schema({
    message: {
        type: String,
        required: true,
        minLength: [3, 'Your message must be at least 3 characters.'],
        maxLength: [200, 'Your message must be at most 200 characters.']
    },

    answers: {
        type: Map,
        of: answerSchema
    },

    product: { type: Types.ObjectId, ref: 'Item', required: true },

    user: { type: Types.ObjectId, ref: 'User', required: true }

});

const Notifications = model('Notifications', notificationsSchema);

module.exports = Notifications;