const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User")

const JWT_SECRET = 'sjbadofkala56lkfvj'

const tokenBlacklist = new Set();


async function register(email,firstname,lastname, password) {
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

    return {token, user};

};

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Username or Password don\'t match')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (hasMatch == false) {
        throw new Error('Username or Password don\'t match')
    };

    user.hashedPassword = undefined;
    
    const token = createSession(user);

    return {token,user};
}

async function logout(token) {
    tokenBlacklist.add(token);
};
  

 function createSession({_id,firstname,lastname,email}) {
    const payload = {
        _id,
        firstname,
        lastname,
        email
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

module.exports = {
    register,
    login,
    logout,
    verifiToken,
}