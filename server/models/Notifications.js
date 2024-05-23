const { Schema, model, Types } = require('mongoose');


const notificationsSchema = new Schema({
    message: {
        type: String,
        required: true,
        minLength: [3, 'Your message must be at least 3 characters.'],
        maxLength: [200, 'Your message must be at most 200 characters.']
    },

    answer: {
        type: String,
        minLength: [3, 'Answer must be at least 3 characters.'],
        maxLength: [100, 'Answer must be at most 100 characters.']
    },

    aboutProduct: { type: Types.ObjectId, ref: 'Item', required: true },

    fromUser: { type: Types.ObjectId, ref: 'User', required: true },

    toUser: { type: Types.ObjectId, ref: 'User', required: true },

    date: { type: String }

});

notificationsSchema.pre('save', function(next) {
    this.date = new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' }).split(',').join('-');
    next();
})

const Notifications = model('Notifications', notificationsSchema);

module.exports = Notifications;

// с идеята когато зареждаме известията да вземем тези ,които са за определен потребител(toUser),
// или тези, които са от определен потребител(fromUser), отговорът и в двата случая ще бъде сетнат на свободното(answer) поле.
// След селектирането на известията, в зависимост от това дали настоящия потребител е изпращач или получател , отговорът
// не е в пряка зависимост ,а просто бива сетнат на същото известие, а самото отпечарване на екрана ще е или
// вие изпратихте съобщение относно едикой си продукт(ако е селекцията е извършена, чрез (toUser)),
// или вие имате съобшение от едикой си относно едикой си продукт(ако е селекцията е извършена, чрез (fromUser). Тъй като преди следващо влизане или рефрешване на
// страницата ,потребитела който е засегнат в съобщението няма как да разбере е достатъчно , при изпращане от настоящия
// потребител  да се създаде известие, да се отпечата на екрана, а при следващо влизане да се отпечата и  отговорът, ако
// има такъв. 