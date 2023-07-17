import ClientEvent from '../lib/ClientEvent';
import { Events } from 'discord.js';
import Client from '../lib/Client';
import { RawEventPayload } from '../types';

export default new ClientEvent()
  .setEvent(Events.Raw)
  .setCallback((client: Client, packet: RawEventPayload): void => {
    client.logger.debug(`[RAW] Received raw event: ${packet.t}`);
  });
