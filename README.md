<h1 align='center'>Advanced discord bot template</h1>
<p align='center'>An advanced discord bot handler made with discord.js version 14.11.0</p>

<div align='center'>
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/blazsmaster/advanced-discord-bot-template?style=flat">
    <img alt="License MIT" src="https://img.shields.io/github/license/blazsmaster/advanced-discord-bot-template">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/blazsmaster/advanced-discord-bot-template">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/blazsmaster/advanced-discord-bot-template">
    <img alt="Wakatime Stats" src="https://wakatime.com/badge/user/9672c6af-fc74-4d8a-bad8-3d9fe7171448/project/80c5d72e-6dbe-4cb9-83ce-fd7f48667dd6.svg">
</div>
<br>

## Table of contents

* [Introduction](#introduction)
* [Built with](#built-with)
* [Features](#features)
    * [Interaction handlers](#interaction-handlers)
    * [Easy to create](#easy-to-create)
* [Getting started](#getting-started)
    * [Requirements](#requirements)
    * [Installation](#installation)
    * [Configuration](#configuration)
    * [Build](#build)
    * [Scripts](#scripts)
* [Examples](#examples)
    * [Slash Commands](#slash-commands)
    * [Context Menu Commands](#context-menu-commands)
    * [Client Events](#client-events)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## Introduction

This template is an advanced discord bot handler with slash and context menu command support. It's written in typescript and uses the latest version of discord.js (v14). You can easily create any type of command and event with the included custom classes.

## Built with

[![Discord.js](https://img.shields.io/badge/discord.js-5865F2?style=flat&logo=discord&logoColor=fff)](https://discord.js.org)

## Features

### Interaction handlers

* [Slash commands](src/lib/SlashCommand.ts)
* [Context menu commands](src/lib/ContextMenuCommand.ts)
* [Autocomplete](src/events/interactionCreate/ApplicationCommandAutocomplete.ts)
* [Message components](src/events/interactionCreate/MessageComponent.ts)
    * Button clicks
    * Select menus
* [Modal submits](src/events/interactionCreate/ModalSubmit.ts)

### Easy to create

* You don't need to create commands with multiple properties, you can just use the SlashCommand and ContextMenuCommand classes to create commands easily with extended methods (e.g., setCallback(), setCooldown(), etc.).

#### Regular command example

```typescript
import { SlashCommandBuilder } from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  cooldown: 5,
  callback: async (interaction) => {
    await interaction.reply('Pong!');
  },
};
```

#### With the `SlashCommand` class

```typescript
import { SlashCommand } from '../lib/SlashCommand';

export default new SlashCommand()
  .setName('ping')
  .setDescription('Replies with pong!')
  .setCooldown(5)
  .setCallback(async (interaction) => {
    await interaction.reply('Pong!');
  });
```

## Getting started

### Requirements

* [Node.js](https://nodejs.org/en/) version [16.9](https://nodejs.org/dist/v16.9.0/) or higher

### Installation

```bash
# clone the repository
git clone https://github.com/blazsmaster/advanced-discord-bot-template.git
# enter the directory
cd advanced-discord-bot-template
# install dependencies
yarn install
```

### Configuration

Create a `.env` file in the root directory of the project

```dotenv
TOKEN=xxxxxxxx
APPLICATION_ID=12345678
DEBUG=0
AUTO_REGISTER=0
```

- `TOKEN` - Your discord bot token (this is required)
- `APPLICATION_ID` - Your discord bot id (this is required for registering slash and context menu commands)
- `DEBUG` - Set to `1` to enable debug mode
- `AUTO_REGISTER` - Set to `1` to automatically register slash and context menu commands on startup (globally)

### Build

```bash
# build the project
yarn build
# start the bot
yarn start
```

### Scripts

* Project
    * `build` - Build the project
    * `start` - Start the bot in production
    * `dev` - Start the bot in development
    * `watch` - Start the bot in production and restart it on file changes
    * `watch:dev` - Start the bot in development and restart it on file changes
    * `lint` - Run eslint

* Application commands
    * `deploy` - Register commands globally to all guilds
    * `deploy:dev` - Register commands globally to all guilds in development
    * `deploy:guild <guild_id>` - Register commands to a specific guild
    * `deploy:guild:dev <guild_id>` - Register commands to a specific guild in development
    * `destroy` - Delete all global commands
    * `destroy:dev` - Delete all global commands in development
    * `destroy:guild <guild_id>` - Delete all commands in a specific guild
    * `destroy:guild:dev <guild_id>` - Delete all commands in a specific guild in development

## Examples

You can find more example commands in the `src/commands` directory. (I made a few example for all types of commands)

### Slash commands

* All command located in the `src/commands` directory. Create a new folder for each category. (e.g. `src/commands/general`)
* Create a new file for the command. (e.g. `src/commands/general/ping.ts`)

```typescript
import { ChatInputCommandInteraction } from 'discord.js';
import Client from '../../lib/Client';

import { SlashCommand } from '../../lib/SlashCommand';

export default new SlashCommand()
  .setName('ping')
  .setDescription('Replies with pong!')
  .setCooldown(5) // set the cooldown to 5 seconds (custom method)
  .setCallback(async (client: Client, interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content: 'Pong!',
    });
  });
```

* Included examples
    * Basic message reply ([src/commands/general/Hello.ts](src/commands/general/Hello.ts))
    * Message component interaction ([src/commands/moderation/Verify.ts](src/commands/moderation/Verify.ts))
    * String input option with autocomplete ([src/commands/info/Color.ts](src/commands/info/Color.ts))
    * User input option ([src/commands/info/Avatar.ts](src/commands/info/Avatar.ts))

### Context menu commands

* The context menu commands are located in the same directory as the slash commands. (e.g. `src/commands/general`)

```typescript
import { MessageContextMenuCommandInteraction } from 'discord.js';
import Client from '../../lib/Client';

import { ContextMenuCommand } from '../../lib/ContextMenuCommand';

export default new ContextMenuCommand<MessageContextMenuCommandInteraction>()
  .setName('Copy')
  .setCooldown(5)
  .setCallback(async (client: Client, interaction: MessageContextMenuCommandInteraction) => {
    await interaction.reply({
      content: interaction.targetMessage.content,
    });
  });
```

* Included examples
    * Message interaction ([src/commands/moderation/DeleteMessage.context.ts](src/commands/moderation/DeleteMessage.context.ts))
    * User interaction ([src/commands/info/UserInfo.context.ts](src/commands/info/UserInfo.context.ts))

### Client events

* All client events are located in the `src/events` directory.
* Create a new file for each event (or folders to arrange them). (e.g. `src/events/ready.ts`) (e.g. `src/events/interactionCreate/ApplicationCommand.ts`)

```typescript
// import the client event structure
import ClientEvent from '../../lib/ClientEvent';
// import the client
import Client from '../../lib/Client';
// import types from discord.js
import { Events } from 'discord.js';

// create and export a new client event
export default new ClientEvent()
  .setEvent(Events.ClientReady)
  .setCallback(async (client: Client) => {
    console.log(`Logged in as ${client.user.tag}`);
  });
```

* Examples
    * One event separated to different files (for better readability) (`interactionCreate` [src/events/interactionCreate](src/events/interactionCreate))

## Contributing

Contributions are always welcome and appreciated ❤️

* If you have any suggestions or issues please create an [issue](https://github.com/blazsmaster/advanced-discord-bot-template/issues/new).
* If you want to contribute to the project please create a Pull Request.

1. [Fork the repository](https://github.com/blazsmaster/advanced-discord-bot-template/fork)
2. Create your branch from `main` (`git checkout -b my-new-branch`)
3. Change the documentation if you added/changed something important
4. Ensure that you spellcheck your changes
5. Make sure your code lints (`yarn lint`)
6. Stage your changes (`git add .`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin my-new-branch`)
9. Create a new [Pull Request](https://github.com/blazsmaster/advanced-discord-bot-template/compare)

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

## Contact

[![@unrealdoggo on Discord](https://img.shields.io/badge/@unrealdoggo-5865F2?style=flat&logo=discord&logoColor=fff&label=Discord&labelColor=5865F2)](https://discord.com/users/688486778117816383)
