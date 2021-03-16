import { Injectable } from '@nestjs/common';
import FileService from '../file/file.service';
import UserRepository from '../user/service/user.repository';
import { User } from '../user/schema/User';
import { ObjectId } from 'mongoose';

@Injectable()
export default class ProfileService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
  ) {}

  async getProfile(id: ObjectId) {
    const candidate = this.userRepository.findById(id);
    if (!candidate) {
      return { message: 'Пользователь не найден' };
    }
    return candidate;
  }
}
