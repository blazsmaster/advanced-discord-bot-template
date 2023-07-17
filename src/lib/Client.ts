import { Client, ClientOptions, Collection, GatewayIntentBits } from 'discord.js';
import Logger from './Logger';
import { join } from 'path';
import { toString } from 'lodash';
import { InitCommandHandler } from '../handlers/CommandHandler';
import { InitEventHandler } from '../handlers/EventHandler';
import { Command } from '../types';

export default class extends Client {
  public logger: Logger;
  public commands: Collection<string, Command>;
  public cooldowns: Collection<string, Collection<string, number>>;

  constructor(ops?: ClientOptions) {
    super({
      ...ops,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.logger = new Logger(join(__dirname, '../../logs', 'client.log'));

    this.commands = new Collection();
    this.cooldowns = new Collection();
  }

  public async initialize(): Promise<void> {
    InitCommandHandler(this);
    InitEventHandler(this);

    await super.login(toString(process.env.TOKEN));
    this.preventCrashes();
  }

  private preventCrashes(): void {
    process.on('uncaughtException', (err: Error): void => this.logger.error(`Uncaught Exception: ${err.message}`));
    process.on('unhandledRejection', (err: Error): void => this.logger.error(`Unhandled Rejection: ${err.message}`));
  }
}
