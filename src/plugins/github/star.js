const { Octokit } = require("@octokit/rest");
const config = require('config');

const octokit = new Octokit({
    auth: config.get('plugins.github.token'),
});

const starRepo = async (repo, ctx) => {
    await octokit.activity.starRepoForAuthenticatedUser({
        owner: repo.split('/')[0],
        repo: repo.split('/')[1],
    });
    ctx.answerCbQuery('Repo is starred ⭐');
}

module.exports = starRepo;
