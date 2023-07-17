import ClientEvent from '../../lib/ClientEvent';
import { Events, Interaction, InteractionType } from 'discord.js';
import Client from '../../lib/Client';
import { SlashCommand } from '../../lib/SlashCommand';
import { Command } from '../../types';

export default new ClientEvent()
  .setEvent(Events.InteractionCreate)
  .setDisplayName('ApplicationCommandAutocomplete')
  .setCallback(async (client: Client, interaction: Interaction): Promise<void> => {
    if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;
    if (!client.commands.has(interaction.commandName)) return;

    const command: Command | undefined = client.commands.get(interaction.commandName);

    if (command instanceof SlashCommand && command.autocompleteHandler)
      try {
        await command.autocompleteHandler(interaction);
      } catch (error) {
        client.logger.error(`Error while executing the autocomplete for ${command.name}: ${error}`);
      }
  });
