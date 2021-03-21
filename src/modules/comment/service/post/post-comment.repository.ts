import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { PostComment, PostCommentDocument } from '../../schema/PostComment';
import { InjectModel } from '@nestjs/mongoose';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';

@Injectable()
export default class PostCommentRepository {
  constructor(
    @InjectModel(PostComment.name)
    private readonly postCommentModel: Model<PostCommentDocument>,
  ) {}

  async findById(id: ObjectId): Promise<PostComment> {
    return this.postCommentModel.findById(id);
  }

  async create(
    authorId: ObjectId,
    postId: ObjectId,
    dto: PostCommentVerifiedDto,
  ): Promise<PostComment> {
    const currentDate = new Date();
    return this.postCommentModel.create({
      ...dto,
      authorId,
      postId,
      createdIn: currentDate,
      updatedIn: currentDate,
    });
  }

  async update(
    commentId: ObjectId,
    authorId: ObjectId,
    dto: PostCommentVerifiedDto,
  ) {
    const candidate = await this.findById(commentId);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Это не ваш комментарий, чтобы его изменять.' };
    }

    return this.postCommentModel.findByIdAndUpdate(
      { _id: commentId },
      { ...dto, updatedIn: new Date(), redact: true },
    );
  }

  async delete(commentId: ObjectId, authorId: ObjectId) {
    const candidate = await this.findById(commentId);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Это не ваш комментарий, чтобы его изменять.' };
    }

    return this.postCommentModel.findByIdAndDelete({ _id: commentId });
  }
}
