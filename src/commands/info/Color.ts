import { SlashCommand } from '../../lib/SlashCommand';
import axios, { AxiosResponse } from 'axios';
import {
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  HexColorString,
  resolveColor,
  SlashCommandStringOption,
} from 'discord.js';
import Client from '../../lib/Client';
import colors from '../../assets/colors.json';

export default new SlashCommand()
  .setName('color')
  .setDescription('Gets information about a color')
  .addStringOption((o: SlashCommandStringOption) =>
    o
      .setName('color')
      .setDescription('The color to get information about (hex code)')
      .setRequired(true)
      .setAutocomplete(true),
  )
  .setAutocompleteCallback(async (interaction: AutocompleteInteraction): Promise<void> => {
    await interaction.respond(
      colors
        .filter((c: Color) => c.name.toLowerCase().includes(interaction.options.getString('color', true).toLowerCase()))
        .map((c: Color): ApplicationCommandOptionChoiceData => ({
          name: `${c.hex} - ${c.name}`,
          value: c.hex.replace('#', ''),
        }))
        .slice(0, 24),
    );
  })
  .setCallback(async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    const color: string = interaction.options.getString('color', true);

    if (!color.match(/^#([0-9a-f]{3}){1,2}$/i)) {
      await interaction.reply({
        content: 'Invalid color! Please provide a valid hex code, or use the autocomplete to get a color by name.',
        ephemeral: true,
      });
      return;
    }

    const res: AxiosResponse<ColorData> = await axios.get('https://www.thecolorapi.com/id?hex=' + color);
    const data: ColorData = res.data;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(data.name.value)
          .setURL('https://colornames.org/color/' + color)
          .setColor(resolveColor(data.hex.value))
          .setThumbnail(`https://www.colourlovers.com/img/${color.replace('#', '')}/512/512/Sminted.png`)
          .setFields([
            {
              name: 'Hex',
              value: data.hex.value,
            },
            {
              name: 'RGB',
              value: `>>> Red: ${data.rgb.r}\nGreen: ${data.rgb.g}\nBlue: ${data.rgb.b}`,
            },
            {
              name: 'HSL',
              value: `>>> Hue: ${data.hsl.h}\nSaturation: ${data.hsl.s}\nLightness: ${data.hsl.l}`,
            },
            {
              name: 'HSV',
              value: `>>> Hue: ${data.hsv.h}\nSaturation: ${data.hsv.s}\nValue: ${data.hsv.v}`,
            },
            {
              name: 'CMYK',
              value: `>>> Cyan: ${data.cmyk.c}\nMagenta: ${data.cmyk.m}\nYellow: ${data.cmyk.y}\nBlack: ${data.cmyk.k}`,
            },
          ])
          .setFooter({ text: `Contrast: ${data.contrast.value}` }),
      ],
    });
  });

interface Color {
  name: string,
  hex: string
}

interface ColorData {
  hex: {
    value: HexColorString,
  };
  rgb: {
    r: number,
    g: number,
    b: number,
    value: string
  };
  hsl: {
    h: number,
    s: number,
    l: number,
    value: string
  };
  hsv: {
    value: string,
    h: number,
    s: number,
    v: number
  };
  name: {
    value: string,
  };
  cmyk: {
    value: string,
    c: number,
    m: number,
    y: number,
    k: number
  };
  contrast: {
    value: string
  };
}
