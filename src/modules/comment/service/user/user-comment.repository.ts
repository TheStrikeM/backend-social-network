import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';
import { UserComment, UserCommentDocument } from '../../schema/UserComment';

@Injectable()
export default class PostCommentRepository {
  constructor(
    @InjectModel(UserComment.name)
    private readonly userCommentModel: Model<UserCommentDocument>,
  ) {}

  async findById(id: ObjectId): Promise<UserComment> {
    return this.userCommentModel.findById(id);
  }

  async create(dto: PostCommentVerifiedDto): Promise<UserComment> {
    const currentDate = new Date();
    return this.userCommentModel.create({
      ...dto,
      createdIn: currentDate,
      updatedIn: currentDate,
    });
  }

  async update(id: ObjectId, dto: PostCommentVerifiedDto) {
    const candidate = this.findById(id);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    return this.userCommentModel.findByIdAndUpdate(
      { _id: id },
      { ...dto, updatedIn: new Date() },
    );
  }

  async delete(id: ObjectId) {
    const candidate = this.findById(id);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    return this.userCommentModel.findByIdAndDelete({ _id: id });
  }
}
