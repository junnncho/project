import { NestFactory } from '@nestjs/core';
import {
  AllAppModule,
  BatchAppModule,
  FederationAppModule,
} from './module/app.module';
import { boot, bootBatch } from './boot';
import { environment } from './environments/environment';

const bootstrap = async () => {
  const serverMode = process.env.SERVER_MODE as
    | 'federation'
    | 'batch'
    | 'all'
    | null;
  if (serverMode === 'federation') {
    const app = await NestFactory.create(
      FederationAppModule.register(environment)
    );
    await bootBatch(app, environment);
  } else if (serverMode === 'batch') {
    
    const app = await NestFactory.create(BatchAppModule.register(environment));
    await bootBatch(app, environment);
  } else if (serverMode === 'all') {
    const app = await NestFactory.create(AllAppModule.register(environment));
    await bootBatch(app, environment);
  } else throw new Error('SERVER_MODE environment variable is not defined');
};
bootstrap();
