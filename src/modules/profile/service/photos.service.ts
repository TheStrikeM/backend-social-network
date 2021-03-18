import { Injectable } from '@nestjs/common';
import { UserDto } from '../../user/dto/UserDto';
import PhotosRepository from '../../user/service/utils/photos.repository';
import FileService from '../../file/file.service';

@Injectable()
export default class PhotosService {
  constructor(
    private readonly photosRepository: PhotosRepository,
    private readonly fileService: FileService,
  ) {}

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
    console.log(avatar);
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

  async addPhoto(candidate: UserDto, file) {
    const photo = this.fileService.createFile(
      candidate.username,
      'photo',
      file,
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
}
