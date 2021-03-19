import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../../schema/User';
import { InjectModel } from '@nestjs/mongoose';
import { UserOrMessage } from '../user.repository';

@Injectable()
export default class PhotosRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async setAvatar(id: ObjectId, fileName: string): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    console.log(fileName);
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { avatar: fileName },
    );
  }

  async removeAvatar(id: ObjectId): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    return this.userModel.findByIdAndUpdate({ _id: id }, { avatar: '' });
  }

  async addPhoto(id: ObjectId, fileName: string): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    return this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        photos: [...user.photos, fileName],
      },
    );
  }

  async removePhoto(id: ObjectId, fileName: string): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    const removedPhoto = user.photos.filter((photo) => photo !== fileName);
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        photos: removedPhoto,
      },
    );
  }
}
