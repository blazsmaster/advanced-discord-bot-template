import 'dotenv/config';
import Logger from '../lib/Logger';
import { Dirent, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { REST, Routes } from 'discord.js';
import { toString } from 'lodash';
import { Command } from '../types';

const logger: Logger = new Logger(join(__dirname, '../../logs', 'deploy.log'));

(async (): Promise<void> => {
  const [, , route, gId]: (string | undefined)[] = process.argv;

  const commands: Command[] = [];

  const loadCommands = async (): Promise<void> => {
    const subfolders: string[] = readdirSync(join(__dirname, '../commands'), { withFileTypes: true })
      .filter((dirent: Dirent) => dirent.isDirectory())
      .map((dirent: Dirent) => dirent.name);

    for (const directory of subfolders) {
      const files: string[] = readdirSync(join(__dirname, '../commands', directory))
        .filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));

      for (const file of files) {
        const commandModule = await import(`../commands/${directory}/${file}`);
        const command: Command = commandModule.default;

        if (command?.name) {
          commands.push(command);
          logger.info(`Loaded command: ${command.name}`);
        } else logger.warn(`Command ${file} does not have a name, so it will not be registered.`);
      }
    }
  };

  const rest: REST = await new REST({ version: '10' }).setToken(toString(process.env.TOKEN));

  switch (route) {
    case 'global': {
      await loadCommands();

      rest.put(
        Routes.applicationCommands(toString(process.env.APPLICATION_ID)), { body: commands.map((cmd: Command) => cmd.toJSON()) },
      ).then((): void => {
        logger.info(`Successfully registered ${commands.length} interaction commands globally`);
      }).catch((e: Error): void => {
        logger.error(`Failed to register commands: ${e.message}`);
      });

      break;
    }

    case 'guild': {
      if (!gId) {
        logger.error('Please provide a guild ID as an argument.');
        process.exit(1);
      }

      await loadCommands();

      rest.put(
        Routes.applicationGuildCommands(toString(process.env.APPLICATION_ID), gId), { body: commands.map((cmd: Command) => cmd.toJSON()) },
      ).then((): void => {
        logger.info(`Successfully registered ${commands.length} interaction commands for guild ${gId}`);
      }).catch((e: Error): void => {
        logger.error(`Failed to register guild commands: ${e.message}`);
      });

      break;
    }

    default: {
      logger.error('Please provide a valid route (global or guild) as an argument.');
      process.exit(1);
    }
  }
})();
