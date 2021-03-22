import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { PostDto } from '../../../post/dto/PostDto';
import PostRepository from '../../../post/service/post.repository';
import { Post } from '../../../post/schema/Post';

@Injectable()
export default class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async addPost(authorId: ObjectId, dto: PostDto) {
    return this.postRepository.create({
      ...dto,
      authorId,
      createdIn: new Date(),
    });
  }

  async findById(postId: ObjectId): Promise<Post> {
    return this.postRepository.findById(postId);
  }

  async changePost(authorId: ObjectId, postId: ObjectId, dto: PostDto) {
    return this.postRepository.update(postId, dto);
  }

  async deletePost(postId: ObjectId, authorId: ObjectId) {
    return this.postRepository.delete(postId, authorId);
  }
}
