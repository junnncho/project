import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@custom/index';
import { AuthModule } from '@app/auth/auth.module';
import { CommunityRepository, UserRepository } from '@repo';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CommunityRepository, UserRepository]),
    AuthModule,
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
