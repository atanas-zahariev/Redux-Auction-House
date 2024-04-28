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

notificationsControler.post('/createNotice', hasUser(), async (req, res) => {
    const { message, product, user } = req.body;

    const item = {
        message,
        product,
        user
    }

    try {
        const result = await createNotification(item)
        res.json(result)
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message)
    }
})

notificationsControler.get('/notices', async (req, res) => {
    try {
        const result = await getAllNotifications()
        res.json(result);
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message)
    }
})

notificationsControler.get('/notice/:id', async (req, res) => {
    try {
        const result = await getNotificationById(req.params.id);
        res.json(result)
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message)
    }
})


module.exports = notificationsControler;