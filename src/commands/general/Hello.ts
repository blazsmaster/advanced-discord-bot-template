import { SlashCommand } from '../../lib/SlashCommand';
import Client from '../../lib/Client';
import { ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';

export default new SlashCommand()
  .setName('hello')
  .setDescription('Says hello to you!')
  .setDMPermission(true)
  .setNSFW(false)
  .setCooldown(5)
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  .setCallback(async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.reply({
      content: 'Hello!',
      ephemeral: true,
    });
  });
