import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from './winston.module';
import { transports, format } from 'winston';
import * as chalk from 'chalk'

@Module({
  imports: [
    WinstonModule.forRoot({

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
