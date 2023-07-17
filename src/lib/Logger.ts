import { createLogger, Logger, transports } from 'winston';
import colors from 'colors';
import moment from 'moment';

export default class {
  private logger: Logger;

  constructor(filepath: string) {
    this.logger = createLogger({
      transports: [new transports.File({ filename: filepath })],
    });
  }

  private log(text: string, level: string, color: colors.Color): void {
    this.logger.log({
      level,
      message: `${level.toUpperCase()}: ${text}`,
      _time: moment().format('YYYY_MM_DD__HH_mm_ss'),
    });
    console.log(colors.gray(`[${moment().format('DD:MM:YYYY - HH:mm')}]`) + color(` ${text}`));
  }

  public info(text: string): void {
    this.log(text, 'info', colors.blue);
  }

  public debug(text: string): void {
    this.log(text, 'debug', colors.magenta);
  }

  public warn(text: string): void {
    this.log(text, 'warn', colors.yellow);
  }

  public error(text: string): void {
    this.log(text, 'error', colors.red);
  }
}
