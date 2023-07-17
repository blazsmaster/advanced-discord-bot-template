import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  MessageContextMenuCommandInteraction,
  SlashCommandBuilder,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import Client from '../lib/Client';
import { SlashCommand } from '../lib/SlashCommand';
import { ContextMenuCommand } from '../lib/ContextMenuCommand';

export interface IClientEvent {
  name: string;
  once?: boolean;
  displayName?: string;
  callback: (...args: Array<any>) => void;
}

export type Command = SlashCommand | ContextMenuCommand<AnyContextMenuCommandInteraction>;

export interface ISlashCommand extends SlashCommandBuilder {
  interactionHandler: ((client: Client, interaction: ChatInputCommandInteraction) => Promise<void>) | null;
  autocompleteHandler: ((interaction: AutocompleteInteraction) => Promise<void>) | null;
  cooldown: number | null;

  /**
   * Sets the cooldown for the command
   * @param seconds The cooldown in seconds
   */
  setCooldown(seconds: number): this;

  /**
   * Sets the executable for the command
   * @param callback The callback to execute
   */
  setCallback(callback: (client: Client, interaction: ChatInputCommandInteraction) => Promise<void>): this;

  /**
   * Sets the autocomplete interaction for the command
   * @param callback The callback to execute
   */
  setAutocompleteCallback(callback: (interaction: AutocompleteInteraction) => Promise<void>): this;
}

export type AnyContextMenuCommandInteraction = MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction;

export interface IContextMenuCommand<T extends AnyContextMenuCommandInteraction> extends ContextMenuCommandBuilder {
  interactionHandler: ((client: Client, interaction: T) => Promise<void>) | null;
  cooldown: number | null;

  /**
   * Sets the cooldown for the command
   * @param seconds The cooldown in seconds
   */
  setCooldown(seconds: number): this;

  /**
   * Sets the executable for the command
   * @param callback The callback to execute
   */
  setExecutable(callback: (client: Client, interaction: T) => Promise<void>): this;
}

/**
 * Payload Structure
 * @see https://discord.com/developers/docs/topics/gateway-events#payload-structure
 */
export interface RawEventPayload {
  op: number,
  d: any,
  s: number,
  t: string
}
