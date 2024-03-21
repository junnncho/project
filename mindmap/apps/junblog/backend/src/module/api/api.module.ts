import { MulterModule } from '@nestjs/platform-express';
import { ApiController } from './api.controller';
import { Global, Module } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Global()
@Module({
  imports: [
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
  controllers: [ApiController],
  providers: [],
  exports: [],
})
export class ApiModule {}
