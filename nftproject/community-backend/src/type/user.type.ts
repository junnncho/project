import { IsOptional, IsString } from 'class-validator';

export class GetProfileAPI {
  profile: { id: number; img: string | null; name: string };
  bannerImg?: string;
  nfts: number;
  communities?:
    | { id: number; img: string; name?: string; holder?: boolean }[]
    | number;
  wallet: string;
  description: string;
}

export class updateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profileImg?: string;

  @IsOptional()
  @IsString()
  bannerImg?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
