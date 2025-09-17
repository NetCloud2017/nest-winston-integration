import { Controller, Get , Inject, Logger} from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_LOGGER_TOKEN } from './winston.module';
@Controller()
export class AppController {

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('log 33333', AppController.name)
    return this.appService.getHello();
  }
}
