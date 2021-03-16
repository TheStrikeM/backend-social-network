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

  async findById(id: ObjectId): Promise<UserOrMessage> {
    return this.userModel.findById(id);
  }

  async create(dto: UserDto): Promise<User> {
    return this.userModel.create({ ...dto });
  }

  async setAvatar(id: ObjectId, fileName: string): Promise<UserOrMessage> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      return { message: 'Пользователь не найден' };
    }

    return this.userModel.findByIdAndUpdate(id, { ...user, avatar: fileName });
  }
}
