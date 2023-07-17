import ClientEvent from '../../lib/ClientEvent';
import { Colors, EmbedBuilder, Events, Interaction, InteractionType } from 'discord.js';
import Client from '../../lib/Client';

export default new ClientEvent()
  .setEvent(Events.InteractionCreate)
  .setDisplayName('ModalSubmit')
  .setCallback(async (client: Client, interaction: Interaction): Promise<void> => {
    if (interaction.type !== InteractionType.ModalSubmit) return;

    await interaction.deferUpdate();

    switch (interaction.customId) {
      case 'verify_modal': {
        const input: string = interaction.fields.getTextInputValue('verify_modal_input');

        if (input === 'VERIFY') {
          await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Verified')
                .setDescription('You have been verified.')
                .setColor(Colors.Green)
                .setFooter({ text: 'This is an example of a modal interaction.' }),
            ],
            components: [],
          });
          return;
        } else {
          await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Not Verified')
                .setDescription('You have not been verified.')
                .setColor(Colors.Red)
                .setFooter({ text: 'This is an example of a modal interaction.' }),
            ],
            components: [],
          });
          return;
        }
      }
    }
  });
