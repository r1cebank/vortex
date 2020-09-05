const { Octokit } = require("@octokit/rest");
const config = require('config');

const octokit = new Octokit({
    auth: config.get('plugins.github.token'),
});

const forkRepo = async (repo, ctx) => {
    await octokit.repos.createFork({
        owner: repo.split('/')[0],
        repo: repo.split('/')[1],
    });
    ctx.answerCbQuery('Repo is forked ⭐');
}

module.exports = forkRepo;
