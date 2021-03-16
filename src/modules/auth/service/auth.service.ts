import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/service/user.repository';
import CryptoService from './crypto.service';
import { UserLoginDto, UserRegisterDto } from '../../user/dto/UserDto';
import { User } from '../../user/schema/User';
import { JwtService } from '@nestjs/jwt';

export type SecureUser = Pick<
  User,
  | 'email'
  | 'username'
  | 'full_name'
  | 'desc'
  | 'avatar'
  | 'photos'
  | 'country'
  | 'state'
  | 'registredIn'
  | 'verify'
  | 'confirmed'
  | 'online'
  | 'role'
  | 'website'
  | 'friends'
  | 'subscribers'
  | 'subscriptions'
  | 'posts'
  | 'reposts'
  | 'comments'
  | 'postComments'
>;

export type GeneratedToken<U> = {
  message: string;
  accessToken: string;
  user: U;
};

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: UserLoginDto): Promise<SecureUser | null> {
    const candidate: User = await this.userRepository.findByUsername(
      dto.username,
    );
    const decryptedPassword = this.cryptoService.decrypt(candidate.password);
    if (candidate && decryptedPassword === dto.password) {
      const { password, ...secureUser } = candidate;
      return secureUser;
    }

    return null;
  }

  async generateToken(user): Promise<GeneratedToken<any>> {
    const { password, ...payload } = user._doc;
    const token = await this.jwtService.signAsync({ user: payload });
    return {
      message: 'Вы успешно авторизовались!',
      accessToken: token,
      user: payload,
    };
  }

  async register(user: UserRegisterDto): Promise<User | void> {
    const candidate: User = await this.userRepository.findByUsername(
      user.username,
    );
    if (candidate) {
      throw new Error('Данный пользователь уже существует');
    }
    const registredIn = new Date();

    const encryptedPassword = this.cryptoService.encrypt(user.password);
    return this.userRepository.create({
      ...user,
      password: encryptedPassword,
      registredIn,
    });
  }
}
