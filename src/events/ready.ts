import ClientEvent from '../lib/ClientEvent';
import { Events } from 'discord.js';
import Client from '../lib/Client';

export default new ClientEvent()
  .setEvent(Events.ClientReady)
  .setOnce(true)
  .setCallback((client: Client): void => {
    client.logger.info(`Logged in as ${client.user?.tag}!`);
  });
