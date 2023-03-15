# Discord Bot TypeScript Template

[![discord.js](https://img.shields.io/github/package-json/dependency-version/KevinNovak/Discord-Bot-TypeScript-Template/discord.js)](https://discord.js.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/KevinNovak/Discord-Bot-TypeScript-Template.svg)](https://github.com/KevinNovak/Discord-Bot-TypeScript-Template/stargazers)
[![Pull Requests](https://img.shields.io/badge/Pull%20Requests-Welcome!-brightgreen)](https://github.com/KevinNovak/Discord-Bot-TypeScript-Template/pulls)

**Discord bot** - A discord.js bot template written with TypeScript.

## Introduction

This is a Discord chatbot which relays messages to an external API.

## Features

## Commands

This bot has the following commands.

### Help Command

A `/help` command to get help on different areas of the bot or to contact support:

![](https://i.imgur.com/UUA4WzL.png)

![](https://i.imgur.com/YtDdmTe.png)

![](https://i.imgur.com/JXMisap.png)

### Info Command

A `/info` command to get information about the bot, links to different resources, or developer information.

![](https://i.imgur.com/jHp9rSG.png)

![](https://i.imgur.com/cOyCg49.png)

### Test Command

A generic command, `/test`, which can be copied to create additional commands.

![](https://i.imgur.com/lqjkNKM.png)

### Welcome Message

A welcome message is sent to the server and owner when the bot is added.

![](https://i.imgur.com/QBw8H8v.png)

## Setup

1. Copy example config files.
    - Navigate to the `config` folder of this project.
    - Copy all files ending in `.example.json` and remove the `.example` from the copied file names.
        - Ex: `config.example.json` should be copied and renamed as `config.json`.
2. Obtain a bot token.
    - You'll need to create a new bot in your [Discord Developer Portal](https://discord.com/developers/applications/).
        - See [here](https://www.writebots.com/discord-bot-token/) for detailed instructions.
        - At the end you should have a **bot token**.
3. Modify the config file.
    - Open the `config/config.json` file.
    - You'll need to edit the following values:
        - `client.id` - Your discord bot's [user ID](https://techswift.org/2020/04/22/how-to-find-your-user-id-on-discord/).
        - `client.token` - Your discord bot's token.
4. Install packages.
    - Navigate into the downloaded source files and type `npm install`.
5. Register commands.
    - In order to use slash commands, they first [have to be registered](https://discordjs.guide/creating-your-bot/command-deployment.html).
    - Type `npm run commands:register` to register the bot's commands.
        - Run this script any time you change a command name, structure, or add/remove commands.
        - This is so Discord knows what your commands look like.
        - It may take up to an hour for command changes to appear.

## Start Scripts

You can run the bot in multiple modes:

1. Normal Mode
    - Type `npm start`.
    - Starts a single instance of the bot.
2. Manager Mode
    - Type `npm run start:manager`.
    - Starts a shard manager which will spawn multiple bot shards.
3. PM2 Mode
    - Type `npm run start:pm2`.
    - Similar to Manager Mode but uses [PM2](https://pm2.keymetrics.io/) to manage processes.
