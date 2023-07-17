import { SlashCommand } from '../../lib/SlashCommand';
import Client from '../../lib/Client';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
} from 'discord.js';

export default new SlashCommand()
  .setName('verify')
  .setDescription('Verify yourself')
  .setDMPermission(false)
  .setCallback(async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setTitle('Verify')
          .setDescription('Please, click the button below to verify yourself.')
          .setColor(Colors.Blurple)
          .setFooter({ text: 'This is an example of a modal interaction.' }),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>()
          .setComponents(
            new ButtonBuilder()
              .setCustomId('verify')
              .setLabel('Verify')
              .setStyle(ButtonStyle.Success)
              .setEmoji('✅'),
          ),
      ],
    });
  });
