import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/service/user.repository';

@Injectable()
export default class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  getSex(): any {
    return { message: 'Привет!' };
  }
}
