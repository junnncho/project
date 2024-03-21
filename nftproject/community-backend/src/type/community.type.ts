import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  account: string[];

  @IsString()
  profileimg: string;
  
  @IsString()
  bannerimg: string;
}

export interface CommunityDict {
  [key: string]: boolean;
}
