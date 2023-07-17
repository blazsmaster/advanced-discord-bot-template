import ClientEvent from '../../lib/ClientEvent';
import { ChatInputCommandInteraction, Collection, Events, Interaction, InteractionType } from 'discord.js';
import Client from '../../lib/Client';
import { SlashCommand } from '../../lib/SlashCommand';
import { AnyContextMenuCommandInteraction, Command } from '../../types';

export default new ClientEvent()
  .setEvent(Events.InteractionCreate)
  .setDisplayName('ApplicationCommand')
  .setCallback(async (client: Client, interaction: Interaction): Promise<void> => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;
    if (!client.commands.has(interaction.commandName)) return;

    const command: Command | undefined = client.commands.get(interaction.commandName);
    if (!command) return;

    if (command.cooldown) {
      if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());
      const timestamps: Collection<string, number> | undefined = client.cooldowns.get(command.name);

      if (timestamps) {
        const now: number = Date.now();
        const cooldownAmount: number = command.cooldown * 1000;

        if (timestamps.has(interaction.user.id)) {
          const expirationTime: number = (timestamps.get(interaction.user.id) || now) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft: number = (expirationTime - now) / 1000;
            await interaction.reply({
              content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
              ephemeral: true,
            });
            return;
          }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
      }
    }

    try {
      if (command.interactionHandler)
        if (command instanceof SlashCommand)
          await command.interactionHandler(client, interaction as ChatInputCommandInteraction);
        else
          await command.interactionHandler(client, interaction as AnyContextMenuCommandInteraction);
    } catch (error) {
      client.logger.error(`Error while executing the command ${command.name}: ${error}`);
      await interaction.reply({
        content: 'There was an error while executing this command!\nPlease, report this to the developers.',
        ephemeral: true,
      });
    }
  });
