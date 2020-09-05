const config = require('config');

const middleware = async (ctx, next) => {
    const currentUser = ctx.from.id;
    const whitelistUsers = config.get('telegram.whitelist').split(',');
    if (whitelistUsers.includes(`${currentUser}`)) {
        next();
    } else {
        ctx.reply('🚫 Sorry, you are not authorized to use this bot');
    }
}


module.exports = {
    name: 'auth',
    provides: ['middleware'],
    middlewares: [middleware]
};
