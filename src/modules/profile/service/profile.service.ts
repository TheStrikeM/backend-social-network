import { Injectable } from '@nestjs/common';
import FileService from '../../file/file.service';
import UserRepository from '../../user/service/user.repository';
import { ObjectId } from 'mongoose';
import SubscribeRepository from '../../user/service/utils/subscribe.repository';
import PhotosRepository from '../../user/service/utils/photos.repository';
import { UserDto } from '../../user/dto/UserDto';

@Injectable()
export default class ProfileService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly photosRepository: PhotosRepository,
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
}
