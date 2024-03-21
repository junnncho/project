import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { LogService } from '@shared/util-server';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';

@Catch()
export class TelegrafExceptionFilter
  extends LogService
  implements ExceptionFilter
{
  constructor() {
    super('RealTimeUpdate');
  }
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    // const telegrafHost = TelegrafArgumentsHost.create(host);
    // const ctx = telegrafHost.getContext<Scenes.SceneContext>();
    this.logger.error(exception.message);
  }
}
