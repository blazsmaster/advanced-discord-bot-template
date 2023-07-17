import Client from '../lib/Client';
import { Dirent, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { REST, Routes } from 'discord.js';
import { toInteger, toString } from 'lodash';
import { Command } from '../types';

export const InitCommandHandler = async (client: Client): Promise<void> => {
  const commands: Command[] = [];

  const directories: string[] = readdirSync(join(__dirname, '../commands'), { withFileTypes: true })
    .filter((dirent: Dirent) => dirent.isDirectory())
    .map((dirent: Dirent) => dirent.name);

  for (const directory of directories) {
    const files: string[] = readdirSync(join(__dirname, '../commands', directory))
      .filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of files) {
      const commandModule = await import(`../commands/${directory}/${file}`);
      const command: Command = commandModule.default;

      if (command?.name) {
        commands.push(command);
        client.commands.set(command.name, command);
        client.logger.info(`Loaded command: ${command.name}`);
      } else {
        client.logger.warn(`Command ${file} does not have a name, so it will not be registered.`);
      }
    }
  }

  if (toInteger(process.env.AUTO_REGISTER)) {
    await new REST({ version: '10' })
      .setToken(toString(process.env.TOKEN))
      .put(Routes.applicationCommands(toString(process.env.APPLICATION_ID)), { body: commands.map((cmd: Command) => cmd.toJSON()) })
      .then((): void => {
        client.logger.info(`Successfully registered ${commands.length} interaction commands`);
      })
      .catch((e: Error): void => {
        client.logger.error(`Failed to register commands: ${e.message}`);
      });
  }
};
