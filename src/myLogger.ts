import {ConsoleLogger, LogLevel , LoggerService} from '@nestjs/common';
import { createLogger , format, Logger, transports } from 'winston'; 
import * as chalk from 'chalk'
import * as dayjs from 'dayjs'

export class MyLogger implements LoggerService {
  private logger: Logger;
  constructor () {

    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
      transports: [
        new transports.Console(
          {
            format: format.combine(
              format.colorize(),
              format.printf(({level, message, context, time}) => {
                const appStr = chalk.green(`[NEST]`);
                const contextStr = chalk.yellow(`[${context}]`)
                return `${appStr} ${time} ${level} ${contextStr} ${message}`
              })
            )
          }
        ),
        new transports.File({
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            filename: '111.log',
            dirname: 'log'
        })
      ]
    })
  }
  log(message: string, context: string) {
      const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

      this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
      const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

      this.logger.log('info', message, { context, time });
  }

  warn(message: string, context: string) {
      const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

      this.logger.log('info', message, { context, time });
  }
}
