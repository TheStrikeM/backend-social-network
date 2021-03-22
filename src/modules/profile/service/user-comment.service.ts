import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import UserCommentRepository from '../../comment/service/user/user-comment.repository';
import { UserCommentVerifiedDto } from '../../comment/dto/UserCommentDto';

@Injectable()
export default class UserCommentService {
  constructor(private readonly userCommentRepository: UserCommentRepository) {}

  async addCommentToPost(
    userId: ObjectId,
    authorId: ObjectId,
    comment: UserCommentVerifiedDto,
  ) {
    return this.userCommentRepository.create(userId, authorId, comment);
  }

  async updateComment(commentId: ObjectId, authorId: ObjectId, comment) {
    return this.userCommentRepository.update(commentId, authorId, comment);
  }

  async deleteComment(commentId: ObjectId, authorId: ObjectId) {
    return this.userCommentRepository.delete(commentId, authorId);
  }

  async findByCommentId(commentId) {
    return this.userCommentRepository.findById(commentId);
  }
}
