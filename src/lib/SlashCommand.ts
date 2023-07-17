import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Client from './Client';
import { ISlashCommand } from '../types';

export class SlashCommand extends SlashCommandBuilder implements ISlashCommand {
  public interactionHandler: ((client: Client, interaction: ChatInputCommandInteraction) => Promise<void>) | null;
  public autocompleteHandler: ((interaction: AutocompleteInteraction) => Promise<void>) | null;
  public cooldown: number | null;

  constructor() {
    super();
    this.interactionHandler = null;
    this.autocompleteHandler = null;
    this.cooldown = null;
  }

  public setCooldown(seconds: number): this {
    this.cooldown = seconds;
    return this;
  }

  public setCallback(callback: (client: Client, interaction: ChatInputCommandInteraction) => Promise<void>): this {
    this.interactionHandler = callback;
    return this;
  }

  public setAutocompleteCallback(callback: (interaction: AutocompleteInteraction) => Promise<void>): this {
    this.autocompleteHandler = callback;
    return this;
  }
}
