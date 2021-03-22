import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { PostComment, PostCommentDocument } from '../../schema/PostComment';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';
import PostRepository from '../../../post/service/post.repository';
import { PostDocument } from '../../../post/schema/Post';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class PostCommentRepository {
  constructor(
    @InjectModel(PostComment.name)
    private readonly postCommentModel: Model<PostCommentDocument>,
    private readonly postRepository: PostRepository,
  ) {}

  async findById(id: ObjectId) {
    return this.postCommentModel.findById(id);
  }

  async create(
    authorId: ObjectId,
    postId: ObjectId,
    dto: PostCommentVerifiedDto,
  ) {
    const currentDate = new Date();
    const candidatePost: PostDocument = await this.postRepository.findById(
      postId,
    );
    if (!candidatePost) {
      return { message: 'Пост не найден' };
    }

    const newComment: PostCommentDocument = await this.postCommentModel.create({
      ...dto,
      authorId,
      postId,
      createdIn: currentDate,
      updatedIn: currentDate,
    });
    const updPost = await this.postRepository.update(postId, {
      comments: [...candidatePost.comments, newComment._id],
    });

    return newComment;
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
    const candidate: PostCommentDocument = await this.findById(commentId);
    let continues = false;
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Это не ваш комментарий, чтобы его изменять.' };
    }
    const mainPost = await this.postRepository.findById(candidate.postId);

    mainPost.comments.forEach((comment) => {
      if (String(comment) === String(commentId)) {
        continues = true;
      }
    });

    const filteredComments = mainPost.comments.filter((comment) => {
      return String(comment) !== String(commentId);
    });

    if (continues) {
      const updPost = await this.postRepository.update(candidate.postId, {
        comments: filteredComments,
      });

      return this.postCommentModel.findByIdAndDelete({ _id: commentId });
    }
    return { message: 'В посте не было найдено такого комментария' };
  }
}
