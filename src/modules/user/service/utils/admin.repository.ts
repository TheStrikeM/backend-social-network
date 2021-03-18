import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schema/User';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export default class AdminRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async socialOnline(): Promise<number> {
    const users = await this.userModel.find({ online: true });
    return users.length;
  }

  async getAllUsers(limit: number): Promise<User[]> {
    return this.userModel.find().limit(limit);
  }

  async deleteUser(id: ObjectId): Promise<User> {
    return this.userModel.findByIdAndDelete({ _id: id });
  }
}
