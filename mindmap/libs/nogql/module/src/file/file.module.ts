import { FileController } from './file.controller';
import * as File from './file.model';
import { FileService } from './file.service';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { option } from '@nogql/module';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([{ name: File.name, useFactory: File.middleware() }]),
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
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {
  static register(envOption: option.EnvironmentOptions): DynamicModule {
    return {
      module: FileModule,
      imports: [MongooseModule.forFeatureAsync([{ name: File.name, useFactory: File.middleware() }])],
      providers: [{ provide: 'ENVIRONMENT_OPTIONS', useValue: envOption }, FileService],
      controllers: [FileController],
      exports: [FileService],
    };
  }
}
