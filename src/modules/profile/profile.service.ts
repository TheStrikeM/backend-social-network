import { Injectable } from '@nestjs/common';
import FileService from '../file/file.service';
import UserRepository from '../user/service/user.repository';
import { ObjectId } from 'mongoose';
import SubscribeRepository from '../user/service/utils/subscribe.repository';
import PhotosRepository from '../user/service/utils/photos.repository';
import {UserDto} from "../user/dto/UserDto";

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

  async subscribeTo(idSender: ObjectId, idRecipient: ObjectId) {
    return this.subscribeRepository.subscribeTo(idSender, idRecipient);
  }

  async unsubscribeTo(idSender: ObjectId, idRecipient: ObjectId) {
    return this.subscribeRepository.unsubscribeTo(idSender, idRecipient);
  }

  async removeAllSubscribers(id: ObjectId) {
    return this.subscribeRepository.removeAllSubscribers(id);
  }

  async removeAllSubscriptions(id: ObjectId) {
    return this.subscribeRepository.removeAllSubscriptions(id);
  }

  async setAvatar(candidate: UserDto, file) {
    if (candidate.avatar.length > 0) {
      this.fileService.deleteFile(
        candidate.username,
        'avatar',
        candidate.avatar,
      );
    }
    const avatar = this.fileService.createFile(
      candidate.username,
      'avatar',
      file,
    );
    return this.photosRepository.setAvatar(candidate._id, avatar);
  }

  async removeAvatar(candidate: UserDto) {
    if (candidate.avatar.length > 0) {
      this.fileService.deleteFile(
        candidate.username,
        'avatar',
        candidate.avatar,
      );
    }
    return this.photosRepository.removeAvatar(candidate._id);
  }

  async addPhoto(candidate: UserDto, fileName) {
    const photo = this.fileService.createFile(
      candidate.username,
      'photo',
      fileName,
    );
    return this.photosRepository.addPhoto(candidate._id, photo);
  }

  async removePhoto(candidate: UserDto, fileName) {
    const photo = this.fileService.deleteFile(
      candidate.username,
      'photo',
      fileName,
    );
    return this.photosRepository.removePhoto(candidate._id, photo);
  }

  async setOnline(id: ObjectId, value: boolean) {
    return this.userRepository.setOnline(id, value);
  }
}
