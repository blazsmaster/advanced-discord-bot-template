import { ContextMenuCommand } from '../../lib/ContextMenuCommand';
import { ApplicationCommandType, MessageContextMenuCommandInteraction, PermissionFlagsBits } from 'discord.js';
import Client from '../../lib/Client';

export default new ContextMenuCommand<MessageContextMenuCommandInteraction>()
  .setName('Delete Message')
  .setType(ApplicationCommandType.Message)
  .setCooldown(3)
  .setExecutable(async (client: Client, interaction: MessageContextMenuCommandInteraction): Promise<void> => {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
      await interaction.reply({
        content: 'You do not have permission to use this command.',
        ephemeral: true,
      });
      return;
    }

    await interaction.targetMessage.delete().then(async (): Promise<void> => {
      await interaction.reply({
        content: 'Message deleted.',
        ephemeral: true,
      });
    }).catch(async (): Promise<void> => {
      await interaction.reply({
        content: 'Unable to delete message.',
        ephemeral: true,
      });
    });
  });
