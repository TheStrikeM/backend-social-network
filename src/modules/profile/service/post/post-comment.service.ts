import { Injectable } from '@nestjs/common';
import PostCommentRepository from '../../../comment/service/post/post-comment.repository';
import { ObjectId } from 'mongoose';
import { PostCommentVerifiedDto } from '../../../comment/dto/PostCommentDto';

@Injectable()
export default class PostCommentService {
  constructor(private readonly postCommentRepository: PostCommentRepository) {}

  async addCommentToPost(
    userId: ObjectId,
    postId: ObjectId,
    comment: PostCommentVerifiedDto,
  ) {
    return this.postCommentRepository.create(userId, postId, comment);
  }

  async updateComment(commentId: ObjectId, authorId: ObjectId, comment) {
    return this.postCommentRepository.update(commentId, authorId, comment);
  }

  async deleteComment(commentId: ObjectId, authorId: ObjectId) {
    return this.postCommentRepository.delete(commentId, authorId);
  }

  async findByCommentId(commentId) {
    return this.postCommentRepository.findById(commentId);
  }
}
