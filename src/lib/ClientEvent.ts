import { Events } from 'discord.js';
import { IClientEvent } from '../types';

export default class ClientEvent implements IClientEvent {
  public name: string;
  public once?: boolean;
  public displayName?: string;
  public callback: (...args: any[]) => void;

  constructor() {
    this.name = '';
    this.once = false;
    this.callback = (): void => void 0;
  }

  public setEvent(name: Events): this {
    this.name = name;
    return this;
  }

  public setOnce(once: boolean): this {
    this.once = once;
    return this;
  }

  public setCallback(callback: (...args: any[]) => void): this {
    this.callback = callback;
    return this;
  }

  public setDisplayName(name: string): this {
    this.displayName = name;
    return this;
  }
}

