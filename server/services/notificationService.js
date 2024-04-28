const Notifications = require('../models/Notifications');


async function getAllNotifications() {
    const notifications = await Notifications.find({}).populate('user').populate('product').lean();
    return notifications;
}

async function getNotificationById(id) {
    const notification = await Notifications.findById(id).populate('user').populate('product').lean();
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

async function deleteNotification(id) {
    await Notifications.findByIdAndDelete(id);
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  editNotification,
  deleteNotification
}