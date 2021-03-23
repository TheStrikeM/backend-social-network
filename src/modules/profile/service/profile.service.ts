import { Injectable } from '@nestjs/common';
import FileService from '../../file/file.service';
import UserRepository from '../../user/service/user.repository';
import { ObjectId } from 'mongoose';
import { UserDto } from '../../user/dto/UserDto';

@Injectable()
export default class ProfileService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
  ) {}

  async myProfile(id: ObjectId) {
    const candidate = await this.userRepository.findById(id);
    if (!candidate) {
      return { message: 'Пользователь не найден' };
    }
    return candidate;
  }

  async getProfile(username: string) {
    const candidate = await this.userRepository.findByUsername(username);
    if (!candidate) {
      return { message: 'Пользователь не найден' };
    }
    return candidate;
  }

  async setOnline(id: ObjectId, value: boolean) {
    return this.userRepository.setOnline(id, value);
  }

  async update(id: ObjectId, dto: UserDto) {
    return this.userRepository.update(id, dto);
  }

  async findById(id: ObjectId) {
    return this.userRepository.findById(id);
  }
}
