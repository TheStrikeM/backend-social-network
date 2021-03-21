import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';
import { UserComment, UserCommentDocument } from '../../schema/UserComment';
import { UserCommentVerifiedDto } from '../../dto/UserCommentDto';

@Injectable()
export default class UserCommentRepository {
  constructor(
    @InjectModel(UserComment.name)
    private readonly userCommentModel: Model<UserCommentDocument>,
  ) {}

  async findById(id: ObjectId): Promise<UserComment> {
    return this.userCommentModel.findById(id);
  }

  async create(
    userId: ObjectId,
    authorId: ObjectId,
    dto: PostCommentVerifiedDto,
  ): Promise<UserComment> {
    const currentDate = new Date();
    return this.userCommentModel.create({
      ...dto,
      userId,
      authorId,
      createdIn: currentDate,
      updatedIn: currentDate,
    });
  }

  async update(
    userId: ObjectId,
    authorId: ObjectId,
    dto: UserCommentVerifiedDto,
  ) {
    const candidate = await this.findById(userId);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Это не ваш комментарий, чтобы его изменять.' };
    }

    return this.userCommentModel.findByIdAndUpdate(
      { _id: userId },
      { ...dto, updatedIn: new Date(), redact: true },
    );
  }

  async delete(userId: ObjectId, authorId: ObjectId) {
    const candidate = await this.findById(userId);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Это не ваш комментарий, чтобы его изменять.' };
    }

    return this.userCommentModel.findByIdAndDelete({ _id: userId });
  }
}
