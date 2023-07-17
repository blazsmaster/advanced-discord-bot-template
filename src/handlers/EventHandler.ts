import Client from '../lib/Client';
import { readdirSync, Stats, statSync } from 'node:fs';
import { join } from 'node:path';
import { IClientEvent } from '../types';

const loadEvents = (client: Client, dir: string): void => {
  readdirSync(dir).forEach(async (file: string): Promise<void> => {
    const filePath: string = join(dir, file);
    const fileStats: Stats = statSync(filePath);

    if (fileStats.isDirectory()) loadEvents(client, filePath);
    else if (file.endsWith('.ts') || file.endsWith('.js')) {
      const eventModule = await import(filePath);
      const event: IClientEvent = eventModule.default;
      client.on(event.name, event.callback.bind(null, client));
      client.logger.info(`Loaded event: ${event.name}${event.displayName ? ` (${event.displayName})` : ''}`);
    }
  });
};

export const InitEventHandler = (client: Client): void => {
  loadEvents(client, join(__dirname, '../events'));
};
