import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/User';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserDto } from '../dto/UserDto';
import { start } from 'repl';

export type UserOrMessage = User | { message: string };
export type AdvancedRepositoryType<M> = {
  errors: boolean;
  message: M;
};

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
  ): Promise<
    AdvancedRepositoryType<User[]> | AdvancedRepositoryType<string[]>
  > {
    const sender = await this.userModel.findById(idSender);
    const recipient = await this.userModel.findById(idRecipient);

    type Continues = { start: boolean; message: string[] };
    const continues: Continues = { start: true, message: [] };

    if (!sender) {
      continues.start = false;
      continues.message.push('Потенциальный подписчик не найден');
    }
    if (!recipient) {
      continues.start = false;
      continues.message.push(
        'Человек на которого нужно подписаться не был найден',
      );
    }
    recipient.subscribers.forEach((sub) => {
      if (String(sub) === String(sender._id)) {
        continues.start = false;
        continues.message.push('Вы уже подписаны на этого человека');
      }
    });
    if (sender._id === recipient._id) {
      continues.start = false;
      continues.message.push('Вы не можете подписаться сами на себя');
    }
    if (continues.start) {
      const updSender = await this.userModel.findByIdAndUpdate(
        { _id: sender._id },
        {
          subscriptions: [...sender.subscriptions, recipient._id],
        },
      );
      const updRecipient = await this.userModel.findByIdAndUpdate(
        { _id: recipient._id },
        {
          subscribers: [...recipient.subscribers, sender._id],
        },
      );

      return { errors: continues.start, message: [updSender, updRecipient] };
    }
    return { errors: continues.start, message: continues.message };
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

    const updSender = await this.userModel.findByIdAndUpdate(
      { _id: idSender },
      {
        // subscriptions: sender.subscriptions.filter((el) => el !== idRecipient),
      },
    );
    const updRecipient = await this.userModel.findByIdAndUpdate(
      { _id: idRecipient },
      {
        // subscribers: recipient.subscribers.filter((el) => el !== idSender),
      },
    );

    return [updSender, updRecipient];
  }

  async setOnline(id: ObjectId, value: boolean) {
    return this.userModel.findByIdAndUpdate(id, { online: value });
  }
}
