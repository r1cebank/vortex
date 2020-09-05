const Markup = require('telegraf/markup');

const { Octokit } = require("@octokit/rest");
const config = require('config');

const { registerCQHandler } = require('../../cqHandler');
const starRepo = require('./star');
const forkRepo = require('./fork');

const matchRegex = /github.com\/(.+\/.+)/i;

const octokit = new Octokit({
    auth: config.get('plugins.github.token'),
});

const middleware = async (ctx, next) => {
    // We only handles with messages and callbacks
    if (ctx.message) {
        const { text, message_id } = ctx.message;

        // Match github url
        const match = matchRegex.test(text);
        const repo = matchRegex.exec(text)[1];

        const { status } = await octokit.activity.checkRepoIsStarredByAuthenticatedUser({
            owner: repo.split('/')[0],
            repo: repo.split('/')[1],
        });

        if (match) {
            ctx.reply('I have detected an github link, what do you want to do?', {
                reply_to_message_id: message_id,
                reply_markup: Markup.inlineKeyboard([
                    (status === 204) ? Markup.callbackButton('Repo Starred', 'github:noop')
                        : Markup.callbackButton('⭐ Star', 'github:star'),
                    Markup.callbackButton('🍴 Fork', 'github:fork')
                ])
            });
            // Register the callback
            registerCQHandler('github:star', repo, starRepo);
            registerCQHandler('github:fork', repo, forkRepo);
        }
    }
    next();
}


module.exports = {
    name: 'github',
    provides: ['middleware'],
    middlewares: [middleware]
};
