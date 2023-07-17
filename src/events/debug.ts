import ClientEvent from '../lib/ClientEvent';
import { Events } from 'discord.js';
import Client from '../lib/Client';
import { toInteger } from 'lodash';

export default new ClientEvent()
  .setEvent(Events.Debug)
  .setCallback((client: Client, info: string): void => {
    if (toInteger(process.env.DEBUG)) client.logger.debug(info);
  });
