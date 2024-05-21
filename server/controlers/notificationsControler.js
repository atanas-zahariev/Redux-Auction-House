const { hasUser } = require('./guard');
const errorParser = require('../utyl/parser');

const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    editNotification,
    deleteNotification,
    setAnswer
} = require('../services/notificationService');

const notificationsControler = require('express').Router()

notificationsControler.post('/createNotice', async (req, res) => {
    console.log(req.body);
    const { message, aboutProduct, fromUser, toUser } = req.body;

    const item = {
        message,
        aboutProduct,
        fromUser,
        toUser
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

notificationsControler.post('/editNotice/:id', async (req, res) => {
    const { message } = req.body

    const editedMesage = { message };

    try {
        const result = await editNotification(editedMesage, req.params.id)
        res.json(result)
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message)
    }
})


notificationsControler.get('/notice/:id', async (req, res) => {
    try {
        await deleteNotification(req.params.id);
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message);
    }
})

notificationsControler.post('/answer', async (req, res) => {
    const { comment, id } = req.body;
    try {
        await setAnswer(comment, id)
        res.end()
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message);
    }
})


module.exports = notificationsControler;