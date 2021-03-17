import { Injectable } from '@nestjs/common';
import FileService from '../file/file.service';
import UserRepository, { UserOrMessage } from '../user/service/user.repository';
import { User } from '../user/schema/User';
import { ObjectId } from 'mongoose';

@Injectable()
export default class ProfileService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
  ) {}

  async getProfile(id: ObjectId) {
    const candidate = await this.userRepository.findById(id);
    if (!candidate) {
      return { message: 'Пользователь не найден' };
    }
    return candidate;
  }

  async subscribeTo(idSender: ObjectId, idRecipient: ObjectId) {
    return this.userRepository.subscribeTo(idSender, idRecipient);
  }

  async unsubscribeTo(idSender: ObjectId, idRecipient: ObjectId) {
    return this.userRepository.unsubscribeTo(idSender, idRecipient);
  }

  async setAvatar(id: ObjectId, file) {
    const candidate = await this.userRepository.findById(id);
    if (!candidate) {
      return { message: 'Пользователь не найден' };
    }
    const avatar = this.fileService.createFile(
      candidate.username,
      'avatar',
      file,
    );
    return this.userRepository.setAvatar(id, avatar);
  }
}
