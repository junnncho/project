import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto, SignInAPI } from '@type';
import { UserRepository } from '@repo';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entity';
import { ProfileConvert } from 'src/function';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getProfile(user: User): Promise<User> {
    return this.userRepository.GetFirstInformation(user.id);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<SignInAPI> {
    const { account } = authCredentialsDto;
    try {
      console.log('!!');
      try {
        await this.userRepository.createUser(account);
      } catch (e) {
        console.log('exist');
      }

      return this.signIn(authCredentialsDto);
    } catch (e) {
      console.log('>>');
      throw new ConflictException('User already exist');
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInAPI> {
    const { account } = authCredentialsDto;
    const user: User = await this.userRepository.findOneBy({ account });
    //지갑의 NFT 정보 불러오는 함수
    if (user) {
      const payload = { id: user.id };
      const token = await this.jwtService.sign(payload);
      const userResponse = await this.userRepository.GetFirstInformation(
        user.id,
      );
      return { token: token, user: ProfileConvert(userResponse, 1) };
    } else {
      throw new UnauthorizedException('user not exist');
    }
  }
}
