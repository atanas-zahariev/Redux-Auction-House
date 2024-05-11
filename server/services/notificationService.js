const { Types } = require('mongoose');
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

async function setAnswer(data, id) {
    const notice = await Notifications.findById(id);
    if (!notice.answers) {
        const userAnswers = new Map()
        userAnswers.set(data.user, data)

        notice.answers = userAnswers;

        return await notice.save();
    } else {
        notice.answers.set(data.user, data);
        return await notice.save();
    }
}

async function deleteNotification(id) {
    await Notifications.findByIdAndDelete(id);
}

async function getOwner(id) {
    // const result = await Notifications.aggregate([
    //     {
    //         $match: {
    //             "product": new Types.ObjectId(id)
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "items", // колекцията с продукти
    //             localField: "product",
    //             foreignField: "_id",
    //             as: "product"
    //         }
    //     },
    //     {
    //         $unwind: "$product"
    //     },
    //     {
    //         $lookup: {
    //             from: "users", // колекцията с потребители (собственици на продуктите)
    //             localField: "product.owner",
    //             foreignField: "_id",
    //             as: "owner"
    //         }
    //     },
    //     {
    //         $unwind: "$owner"
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             // message: 1,
    //             owner: "$owner" // връщаме собственика на продукта
    //         }
    //     }
    // ]);

    const result = await Notifications.aggregate([
        {
            $lookup: {
                from: "items",
                localField: "product",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $lookup: {
                from: "users",
                localField: "product.owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $addFields: {
                "ownerId": "$owner._id" // добавяме поле с ID на собственика
            }
        },
        {
            $match: {
                "ownerId": new Types.ObjectId(id) // филтрираме по ID на собственика
            }
        },
        {
            $project: {
                _id: 1,
                answers: 1,
                owner: "$owner"
            }
        },
        {
            $addFields: {
                "answersArray": { $objectToArray: "$answers" } // преобразуваме Map в масив от обекти
            }
        },
        {
            $unwind: "$answersArray"
        },
        {
            $lookup: {
                from: "users",
                localField: "answersArray.v.user",
                foreignField: "_id",
                as: "populatedAnswers"
            }
        },
        {
            $addFields: {
                "answersArray.v.user": { $arrayElemAt: ["$populatedAnswers", 0] } // присвояваме потребителските данни на съответното поле "user"
            }
        },
        {
            $group: {
                _id: "$_id",
                answers: { $push: "$answersArray.v" }, // създаваме отново Map от масива с присвоените потребителски данни
                owner: { $first: "$owner" }
            }
        },
        {
            $project: {
                _id: 1,
                answers: 1,
                owner: 1
            }
        }
    ]);

    return result;
}

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    editNotification,
    deleteNotification,
    getOwner,
    setAnswer
}