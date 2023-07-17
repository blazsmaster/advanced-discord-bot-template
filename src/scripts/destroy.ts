import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { toString } from 'lodash';
import Logger from '../lib/Logger';
import { join } from 'node:path';

const logger: Logger = new Logger(join(__dirname, '../../logs', 'deploy.log'));

(async (): Promise<void> => {
  const [, , route, gId]: (string | undefined)[] = process.argv;

  const rest: REST = await new REST({ version: '10' }).setToken(toString(process.env.TOKEN));

  switch (route) {
    case 'global': {
      rest.put(
        Routes.applicationCommands(toString(process.env.APPLICATION_ID)), { body: [] },
      ).then((): void => {
        logger.info('Successfully deleted all commands');
      }).catch((e: Error): void => {
        logger.error(`Failed to delete commands: ${e.message}`);
      });

      break;
    }

    case 'guild': {
      if (!gId) {
        logger.error('Please provide a guild ID as an argument.');
        process.exit(1);
      }

      rest.put(
        Routes.applicationGuildCommands(toString(process.env.APPLICATION_ID), gId), { body: [] },
      ).then((): void => {
        logger.info('Successfully deleted all guild commands');
      }).catch((e: Error): void => {
        logger.error(`Failed to delete guild commands: ${e.message}`);
      });

      break;
    }

    default: {
      logger.error('Please provide a valid route (global or guild) as an argument.');
      process.exit(1);
    }
  }
})();
