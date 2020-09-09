const Markup = require('telegraf/markup');

const { Octokit } = require("@octokit/rest");
const config = require('config');

const { registerCQHandler } = require('../../cqHandler');
const starRepo = require('./star');
const forkRepo = require('./fork');

const matchRegex = /github.com\/([a-z0-9-_]+\/[a-z0-9-_]+)\/.*/i;

const octokit = new Octokit({
    auth: config.get('plugins.github.token'),
});

const middleware = async (ctx) => {
    // We only handles with messages and callbacks
    if (ctx.message) {
        const { text, message_id } = ctx.message;

        // Match github url
        const match = matchRegex.test(text);

        if (match) {
            const repo = matchRegex.exec(text)[1];

            try {
                await octokit.activity.checkRepoIsStarredByAuthenticatedUser({
                    owner: repo.split('/')[0],
                    repo: repo.split('/')[1],
                });
                ctx.reply('I have detected an github link, what do you want to do?', {
                    reply_to_message_id: message_id,
                    reply_markup: Markup.inlineKeyboard([
                        Markup.callbackButton('Repo Starred', 'github:noop'),
                        Markup.callbackButton('🍴 Fork', 'github:fork')
                    ])
                });
            } catch (error) {
                ctx.reply('I have detected an github link, what do you want to do?', {
                    reply_to_message_id: message_id,
                    reply_markup: Markup.inlineKeyboard([
                        Markup.callbackButton('⭐ Star', 'github:star'),
                        Markup.callbackButton('🍴 Fork', 'github:fork')
                    ])
                });
            }
            // Register the callback
            registerCQHandler('github:star', repo, starRepo);
            registerCQHandler('github:fork', repo, forkRepo);
        }
    }
    // next();
}


module.exports = {
    name: 'github',
    provides: ['middleware'],
    middlewares: [middleware]
};
