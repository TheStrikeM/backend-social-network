import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/service/user.repository';
import CryptoService from './crypto.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async validateUser(username: string, pass: string)
}
