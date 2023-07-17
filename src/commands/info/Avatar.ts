import { SlashCommand } from '../../lib/SlashCommand';
import Client from '../../lib/Client';
import {
  ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  GuildMember,
  SlashCommandUserOption,
  User,
} from 'discord.js';

export default new SlashCommand()
  .setName('avatar')
  .setDescription('Gets the avatar of a user')
  .setDMPermission(false)
  .setCooldown(5)
  .addUserOption((o: SlashCommandUserOption) =>
    o
      .setName('user')
      .setDescription('The user to get the avatar of'),
  )
  .setCallback(async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    const userOption: User | null = interaction.options.getUser('user', false);
    const user: User | null = userOption ?? interaction.user;

    if (!userOption) {
      await interaction.reply({
        ephemeral: true,
        content: 'User not found',
      });
      return;
    }

    const member: GuildMember | undefined = await interaction.guild?.members.fetch(user.id);

    if (!member) {
      await interaction.reply({
        ephemeral: true,
        content: 'User not found',
      });
      return;
    }

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${member.user.tag}'s avatar`)
          .setImage(member.user.displayAvatarURL({ size: 4096 }))
          .setColor(Colors.Blurple),
      ],
    });
  });
