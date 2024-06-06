const Notifications = require('../models/Notifications');



async function getAllNotifications() {
    const notifications = await Notifications.find({})
        .populate('fromUser')
        .populate('aboutProduct')
        .populate('toUser')
        .lean();

    return notifications;
}

async function getNotificationById(id) {
    const notification = await Notifications.findById(id)
        .populate('aboutProduct')
        .populate('fromUser')
        .populate('toUser')
        .lean();
    return notification;
}

async function createNotification(data) {
    const created = await Notifications.create(data);

    const newNotice = await getNotificationById(created._id); 

    return newNotice 
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