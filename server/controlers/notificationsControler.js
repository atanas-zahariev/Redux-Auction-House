const { hasUser } = require('./guard');
const errorParser = require('../utyl/parser');

const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    editNotification,
    deleteNotification
} = require('../services/notificationService');

const notificationsControler = require('express').Router()

notificationsControler.post('/createNot',hasUser(), async (req, res) => {
    const { message, product, user } = req.body;

    const item = {
        message,
        product,
        user: req.user._id
    }

    try {
        const result = await createNotification(item)
        return result;
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message)
    }
})


module.exports = notificationsControler;