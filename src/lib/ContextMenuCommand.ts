import { ContextMenuCommandBuilder } from 'discord.js';
import { AnyContextMenuCommandInteraction, IContextMenuCommand } from '../types';
import Client from './Client';

export class ContextMenuCommand<T extends AnyContextMenuCommandInteraction> extends ContextMenuCommandBuilder implements IContextMenuCommand<T> {
  public interactionHandler: ((client: Client, interaction: T) => Promise<void>) | null;
  public cooldown: number | null;

  constructor() {
    super();
    this.interactionHandler = null;
    this.cooldown = null;
  }

  public setCooldown(seconds: number): this {
    this.cooldown = seconds;
    return this;
  }

  public setExecutable(callback: (client: Client, interaction: T) => Promise<void>): this {
    this.interactionHandler = callback;
    return this;
  }
}
