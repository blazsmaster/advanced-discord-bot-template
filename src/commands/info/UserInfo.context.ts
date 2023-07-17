import { ContextMenuCommand } from '../../lib/ContextMenuCommand';
import { ApplicationCommandType, Colors, EmbedBuilder, User, UserContextMenuCommandInteraction } from 'discord.js';
import Client from '../../lib/Client';
import moment from 'moment';

export default new ContextMenuCommand<UserContextMenuCommandInteraction>()
  .setName('User Info')
  .setType(ApplicationCommandType.User)
  .setExecutable(async (client: Client, interaction: UserContextMenuCommandInteraction): Promise<void> => {
    const user: User = interaction.options.getUser('user') ?? interaction.user;

    const createUsername = (): string => {
      if (parseInt(user.discriminator) === 0) return `@${user.username}`;
      else return user.tag;
    };

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Blurple)
          .setAuthor({
            name: createUsername(),
            iconURL: user.displayAvatarURL({ size: 64 }),
          })
          .setFields(
            {
              name: 'ID',
              value: user.id,
            },
            {
              name: 'Created At',
              value: `<t:${moment(user.createdTimestamp).unix()}:F>`,
            },
            {
              name: 'Bot',
              value: user.bot ? 'Yes' : 'No',
              inline: true,
            },
            {
              name: 'System',
              value: user.system ? 'Yes' : 'No',
              inline: true,
            },
            {
              name: 'Flags',
              value: user.flags?.toArray().length ? user.flags.toArray().join(', ') : '*None*',
            },
            {
              name: 'Avatar URL (Max Size)',
              value: `[Click Here](${user.displayAvatarURL({ size: 4096 })})`,
              inline: true,
            },
            {
              name: 'Avatar URL (Static)',
              value: `[Click Here](${user.displayAvatarURL()})`,
              inline: true,
            },
            {
              name: 'Mention',
              value: user.toString(),
            },
          ),
      ],
    });
  });
