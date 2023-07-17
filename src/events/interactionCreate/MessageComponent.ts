import ClientEvent from '../../lib/ClientEvent';
import {
  ActionRowBuilder,
  Events,
  Interaction,
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import Client from '../../lib/Client';

export default new ClientEvent()
  .setEvent(Events.InteractionCreate)
  .setDisplayName('MessageComponent')
  .setCallback(async (client: Client, interaction: Interaction): Promise<void> => {
    if (interaction.type !== InteractionType.MessageComponent) return;

    switch (interaction.customId) {
      case 'verify': {
        await interaction.showModal(
          new ModalBuilder()
            .setTitle('Verify')
            .setCustomId('verify_modal')
            .setComponents(
              new ActionRowBuilder<TextInputBuilder>()
                .setComponents(
                  new TextInputBuilder()
                    .setCustomId('verify_modal_input')
                    .setLabel('Verification')
                    .setPlaceholder('Type "VERIFY" to verify that you are not a robot.')
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(1)
                    .setMaxLength(7)
                    .setRequired(true),
                ),
            ),
        );

        break;
      }
    }
  });
