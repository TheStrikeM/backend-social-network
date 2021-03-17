import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/User';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserDto } from '../dto/UserDto';

export type UserOrMessage = User | { message: string };

@Injectable()
export default class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(dto: UserDto): Promise<User> {
    return this.userModel.create({ ...dto });
  }

  async update(id: ObjectId, dto: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, {
      ...dto,
    });
  }

  async setAvatar(id: ObjectId, fileName: string): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    return this.userModel.findByIdAndUpdate(id, { ...user, avatar: fileName });
  }

  async removeAvatar(id: ObjectId): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    return this.userModel.findByIdAndUpdate(id, { ...user, avatar: '' });
  }

  async addPhoto(id: ObjectId, fileName: string): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    return this.userModel.findByIdAndUpdate(id, {
      ...user,
      photos: [...user.photos, fileName],
    });
  }

  async removePhoto(id: ObjectId, fileName: string): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    return this.userModel.findByIdAndUpdate(id, {
      ...user,
      photos: [...user.photos.filter((photo) => photo !== fileName)],
    });
  }

  async subscribeTo(
    idSender: ObjectId,
    idRecipient: ObjectId,
  ): Promise<User[] | { message: string }> {
    const sender = await this.userModel.findById(idSender);
    const recipient = await this.userModel.findById(idRecipient);
    if (!sender) {
      return { message: 'Потенциальный подписчик не найден' };
    }
    if (!recipient) {
      return { message: 'Человек на которого нужно подписаться не был найден' };
    }

    const updSender = await this.userModel.findByIdAndUpdate(idSender, {
      ...sender,
      subscriptions: [...sender.subscriptions, recipient._id],
    });
    const updRecipient = await this.userModel.findByIdAndUpdate(idRecipient, {
      ...recipient,
      subscribers: [...recipient.subscribers, sender._id],
    });

    return [updSender, updRecipient];
  }

  async unsubscribeTo(
    idSender: ObjectId,
    idRecipient: ObjectId,
  ): Promise<User[] | { message: string }> {
    const sender = await this.userModel.findById(idSender);
    const recipient = await this.userModel.findById(idRecipient);
    if (!sender) {
      return { message: 'Потенциальный подписчик не найден' };
    }
    if (!recipient) {
      return { message: 'Человек на которого нужно подписаться не был найден' };
    }

    const updSender = await this.userModel.findByIdAndUpdate(idSender, {
      ...sender,
      subscriptions: sender.subscriptions.filter((el) => el !== recipient._id),
    });
    const updRecipient = await this.userModel.findByIdAndUpdate(idRecipient, {
      ...recipient,
      subscribers: recipient.subscribers.filter((el) => el !== sender._id),
    });

    return [updSender, updRecipient];
  }

  async setOnline(id: ObjectId, value: boolean) {
    return this.userModel.findByIdAndUpdate(id, { online: value });
  }
}
