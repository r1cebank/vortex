# vortex
![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/r1cebank/vortex)
![GitHub followers](https://img.shields.io/github/followers/r1cebank?style=social)
![GitHub stars](https://img.shields.io/github/stars/r1cebank/vortex?style=social)
![GitHub forks](https://img.shields.io/github/forks/r1cebank/vortex?style=social)

Vortex is a basic telegram bot aimed to manage your pasted links.

## Motivation
I often use the "Saved Messages" feature in telegram whenever I find something interesting. Most of the time its a GitHub link. Then 9 out of 10 times I ended up starring the repo or fork the repo. To simplify the process, I want to create a simple telegram bot that will read the links sent and process it acordinly.

## Using vortex
You can use the prebuilt version of vortex fron docker hub, it will by default include all the plugins in this repo.

```
docker run -e TELEGRAM_BOT_TOKEN=VAL -e TELEGRAM_WHITELIST=xxxxxxx r1cebank/vortex
```

You can also build vortex to a docker image and run it on the system of your choice. Simply do:

```
docker build -t sometag .
```

## Authentication
Since telegram bots don't really support authentication, the bot will only allow user id from whitelist to send commands. To configure your own bot, make sure the environment variable `TELEGRAM_WHITELIST` is configured to be a comma-seperated list of the ids you want the bot to accept commands from.

## Supported links

* Github (github.com/xxx/xxx)

## Plugins
vortex is meant to be built with many plugins, currently github is the only plugin that it supports, if you want to support more links, feel free to develop a plugin for that specific link and submit pr. Thanks
