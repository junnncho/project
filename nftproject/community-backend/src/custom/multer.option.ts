import * as config from 'config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3Config: any = config.get('s3');

export const multerOptionsFactory = (): MulterOptions => {
  // s3 인스턴스를 생성합니다.
  const s3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || s3Config.access,
      secretAccessKey: process.env.AWS_SECRET_KEY || s3Config.secret,
    },
  });

  return {
    storage: multerS3({
      s3,

      bucket: process.env.AWS_S3_BUCKET_NAME || s3Config.bucket,
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(
          null,
          `${uuidv4()}${file.originalname.substring(
            file.originalname.lastIndexOf('.'),
          )}`,
        );
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
