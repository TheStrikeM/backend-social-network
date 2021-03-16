import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/service/user.repository';
import CryptoService from './crypto.service';
import { UserDto, UserLoginDto } from '../../user/dto/UserDto';
import { User } from '../../user/schema/User';

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

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
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
}
