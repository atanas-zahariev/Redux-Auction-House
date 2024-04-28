const authControler = require("../controlers/authControler");
const itemControler = require("../controlers/itemControler");
const notificationsControler = require("../controlers/notificationsControler");

module.exports = (app) => {
    app.use('/auth', authControler);
    app.use('/house', itemControler);
    app.use('/notification', notificationsControler);
};
