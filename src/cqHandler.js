const Singleton = require('./singleton');
const logger = require('./logger');

const sharedInstance = Singleton.getInstance();

sharedInstance.cqHandlers = {};

const middleware = async (ctx, next) => {
    if (ctx.callbackQuery) {
        const { data } = ctx.callbackQuery;
        if (sharedInstance.cqHandlers[data]) {
            logger.debug(`Answering ${data} query.`);
            const callbackObject = sharedInstance.cqHandlers[data];
            // Invoke the function the the data
            await callbackObject.fn(callbackObject.data, ctx);
        } else {
            ctx.answerCbQuery('Action is not registered');
        }
    }
    next();
}

const registerCQHandler = (cq, data, fn) => {
    if (sharedInstance.cqHandlers[cq]) {
        logger.debug(`${cq} already had a handler in place, rewriting....`);
    }
    sharedInstance.cqHandlers[cq] = {
        data,
        fn
    };
}

module.exports = {
    middleware,
    registerCQHandler
};
