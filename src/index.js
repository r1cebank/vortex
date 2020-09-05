const path = require('path');
const { Telegraf } = require('telegraf');
const LocalSession = require('telegraf-session-local')
const config = require('config');

const { plugins, register } = require('./plugins');
const { middleware } = require('./cqHandler');
const Singleton = require('./singleton');

const sharedInstance = Singleton.getInstance();

// Create the telegraf bot instance
const bot = new Telegraf(config.get('telegram.token'));

// Store the bot instance in the singleton
sharedInstance.bot = bot;
// Init the plugin storage
sharedInstance.plugins = {};

// Setup the callback handler
bot.use(middleware);

// Register the local session storage
bot.use((new LocalSession({ database: path.join(config.get('storage.directory'), 'session.json') })).middleware())

// Register each plugin
plugins.forEach((plugin) => {
    register(bot, plugin);
});

// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch();
