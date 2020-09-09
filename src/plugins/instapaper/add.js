const axios = require('axios').default;
const config = require('config');

const username = config.get('plugins.instapaper.username')
const password = config.get('plugins.instapaper.password')

const apiHost = 'https://www.instapaper.com/api/';


const api = axios.create({
    baseURL: apiHost
});

const addUrl = async (url, ctx) => {
    await api.get('/add', {
        auth: {
            username,
            password
        },
        params: {
            url
        }
    })
    ctx.answerCbQuery('URL is added 👍');
}

module.exports = addUrl;
