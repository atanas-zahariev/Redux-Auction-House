const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    editNotification,
    deleteNotification
} = require('../services/notificationService');

const notificationsControler = require('express').Router()


module.exports = notificationsControler;