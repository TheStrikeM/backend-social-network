import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';
import { UserComment, UserCommentDocument } from '../../schema/UserComment';
import { UserCommentVerifiedDto } from '../../dto/UserCommentDto';
import { PostDocument } from '../../../post/schema/Post';
import { PostCommentDocument } from '../../schema/PostComment';
import UserRepository from '../../../user/service/user.repository';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class UserCommentRepository {
  constructor(
    @InjectModel(UserComment.name)
    private readonly userCommentModel: Model<UserCommentDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async findById(id: ObjectId) {
    return this.userCommentModel.findById(id);
  }

  async create(
    userId: ObjectId,
    authorId: ObjectId,
    dto: PostCommentVerifiedDto,
  ) {
    const currentDate = new Date();
    const candidateUser: UserDocument = await this.userRepository.findById(
      userId,
    );
    if (!candidateUser) {
      return { message: 'Юзер не найден' };
    }

    console.log(authorId)

    const newComment: UserCommentDocument = await this.userCommentModel.create({
      ...dto,
      authorId,
      userId,
      createdIn: currentDate,
      updatedIn: currentDate,
    });
    const updUser = await this.userRepository.update(userId, {
      comments: [...candidateUser.comments, newComment._id],
    });

    return newComment;
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

  async delete(commentId: ObjectId, authorId: ObjectId) {
    const candidate: UserCommentDocument = await this.findById(commentId);
    let continues = false;
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Это не ваш комментарий, чтобы его изменять.' };
    }
    const mainUser = await this.userRepository.findById(candidate.userId);

    mainUser.comments.forEach((comment) => {
      if (String(comment) === String(commentId)) {
        continues = true;
      }
    });

    const filteredComments = mainUser.comments.filter((comment) => {
      return String(comment) !== String(commentId);
    });

    if (continues) {
      const updUser = await this.userRepository.update(candidate.userId, {
        comments: filteredComments,
      });

      return this.userCommentModel.findByIdAndDelete({ _id: commentId });
    }
    return { message: 'В юзере не было найдено такого комментария' };
  }
}
