const Markup = require('telegraf/markup');

const addUrl = require('./add');
const { registerCQHandler } = require('../../cqHandler');

// eslint-disable-next-line no-useless-escape
const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const middleware = async (ctx, next) => {
    // We only handles with messages and callbacks
    if (ctx.message) {
        const { text, message_id } = ctx.message;

        // Match url
        const match = urlRegex.test(text);

        if (match) {
            ctx.reply('I have detected an url, what do you want to do?', {
                reply_to_message_id: message_id,
                reply_markup: Markup.inlineKeyboard([
                    Markup.callbackButton('⭐ Add to Instapaper', 'instapaper:add')
                ])
            });
            // Register the callback
            registerCQHandler('instapaper:add', urlRegex.exec(text)[1], addUrl);
        }
    }
    next();
}


module.exports = {
    name: 'instapaper',
    provides: ['middleware'],
    middlewares: [middleware]
};
