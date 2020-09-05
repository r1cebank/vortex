const auth = require('./auth');
const github = require('./github');
const logger = require('../logger');

const register = (bot, plugin) => {
    const { name, provides, middlewares } = plugin;
    provides.forEach((item) => {
        // Register middleware
        if (item === 'middleware') {
            if (middlewares.length) {
                logger.debug(`Registered midleware ${name}`);
                middlewares.forEach((middleware) => {
                    bot.use(middleware);
                })
            }
        }
    });
}

module.exports = {
    plugins: [
        auth,
        github
    ],
    register
};
