import { GetUser } from '@custom/get-user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as config from 'config';
import { v4 as uuidv4 } from 'uuid';
const s3Config: any = config.get('s3');
import * as AWS from 'aws-sdk';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@entity';
import { ProfileService } from './profile.service';
import { GetProfileAPI, updateProfileDto } from '@type';
import { ProfileConvert } from '@func';

//AWS S3
const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || s3Config.access,
    secretAccessKey: process.env.AWS_SECRET_KEY || s3Config.secret,
  },
});

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:id')
  async getProfile(@Param('id', ParseIntPipe) id): Promise<GetProfileAPI> {
    const result = await this.profileService.getProfile(id);
    return ProfileConvert(result, 2);
  }

  @Patch('/')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImg', maxCount: 1 },
        { name: 'bannerImg', maxCount: 1 },
      ],
      {
        storage: multerS3({
          s3: s3,
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
        limits: {},
      },
    ),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProfile(
    @UploadedFiles()
    imgs: {
      profileImg: Express.MulterS3.File[];
      bannerImg: Express.MulterS3.File[];
    },
    @Body() updateData: updateProfileDto,
    @GetUser() user: User,
  ): Promise<updateProfileDto> {
    console.log('call update Profile');
    imgs?.profileImg &&
      (updateData['profileImg'] = imgs.profileImg[0].location);
    imgs?.bannerImg && (updateData['bannerImg'] = imgs.bannerImg[0].location);
    await this.profileService.updateProfile(updateData, user.id);
    return updateData;
  }
}
