const { Types } = require('mongoose');
const Notifications = require('../models/Notifications');
const User = require("../models/User")



async function getAllNotifications() {
    const notifications = await Notifications.find({})
        .populate('fromUser')
        .populate('aboutProduct')
        .lean();

    return notifications;
}

async function getNotificationById(id) {
    const notification = await Notifications.findById(id)
        .populate('aboutProduct')
        .populate('fromUser')
        .lean();
    return notification;
}

async function createNotification(data) {
    const created = await Notifications.create(data);

    return created;
}

async function editNotification(data, id) {
    const existing = await Notifications.findById(id);

    existing.message = data.message;

    return await existing.save();
}

async function setAnswer(comment, id) {
    const notice = await Notifications.findById(id);
    notice.answer = comment;

    return await notice.save();
}

async function deleteNotification(id) {
    await Notifications.findByIdAndDelete(id);
}


module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    editNotification,
    deleteNotification,
    setAnswer
}