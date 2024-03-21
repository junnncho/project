import * as Draw from './draw.model';
import { DrawController } from './draw.controller';
import { DrawService } from './draw.service';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { option } from '..';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([{ name: Draw.name, useFactory: Draw.middleware() }]),
    MulterModule.registerAsync({
      useFactory: async () => ({
        storage: diskStorage({
          destination: './data',
          filename(_, file, callback): void {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return callback(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    }),
  ],
  controllers: [DrawController],
  providers: [DrawService],
  exports: [DrawService],
})
export class DrawModule {
  static register(envOption: option.EnvironmentOptions): DynamicModule {
    return {
      module: DrawModule,
      imports: [MongooseModule.forFeatureAsync([{ name: Draw.name, useFactory: Draw.middleware() }])],
      providers: [{ provide: 'ENVIRONMENT_OPTIONS', useValue: envOption }, DrawService],
      controllers: [DrawController],
      exports: [DrawService],
    };
  }
}
