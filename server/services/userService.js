const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User")

const JWT_SECRET = 'sjbadofkala56lkfvj'

const tokenBlacklist = new Set();


async function register(email, firstname, lastname, password) {
    const existing = await User.findOne({ email });

    if (existing) {
        throw new Error('Email already taken')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        firstname,
        lastname
    });
    user.hashedPassword = undefined;

    const token = createSession(user);

    return { token, user };

};

async function login(email, password) {
    const user = await User.findOne({ email })
        .populate({
            path: 'notices',
            populate: {
                path: 'fromUser',
                model: 'User'
            }
        })
        .populate({
            path: 'notices',
            populate: {
                path: 'aboutProduct',
                model: 'Item'
            }
        }).lean();;

    if (!user) {
        throw new Error('Username or Password don\'t match')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (hasMatch == false) {
        throw new Error('Username or Password don\'t match')
    };

    user.hashedPassword = undefined;

    const token = createSession(user);

    return { token, user };
}

async function logout(token) {
    tokenBlacklist.add(token);
};


function createSession({ _id, firstname, lastname, email, notices }) {
    const payload = {
        _id,
        firstname,
        lastname,
        email,
        notices
    }
    const token = jwt.sign(payload, JWT_SECRET)
    return token;
}

function verifiToken(token) {
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, JWT_SECRET);

}

// notices ->

async function setNotice(data, userId, userComment) {
    const owner = await User.findById(userId)
    const sender = await User.findById(data.fromUser);

    if (!data.conversation) {
        const newConversation = new Map()
        newConversation.set(data.aboutProduct, { userComment })

        data.conversation = newConversation
    } else {
        data.conversation.set(data.aboutProduct, { userComment })
    }

    const comment = data.conversation.get(data.aboutProduct).userComment

    const senderConversation = new Map()

    senderConversation.set(data.aboutProduct, {currentUserComment:comment});

    const senderData = {
       aboutProduct:data.aboutProduct,
       conversation: senderConversation
    }

    if (!owner.notices) {
        owner.notices = new Array()
        owner.notices.push(data);

        await owner.save();
    } else {
        owner.notices.push(data);
        await owner.save();
    }

    if(!sender.notices){
        sender.notices = new Array()
        sender.notices.push(senderData)

        await sender.save()

        return sender.notices;
    }else{
        sender.notices.push(senderData)
        await sender.save()

        return sender.notices;
    }
}

module.exports = {
    register,
    login,
    logout,
    verifiToken,
    setNotice
}