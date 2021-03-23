import { Injectable } from '@nestjs/common';
import GetPostRepository from '../../../post/service/utils/get-post.repository';

@Injectable()
export default class PostViewService {
  constructor(private readonly getPostRepository: GetPostRepository) {}

  async getAllPosts() {
    return this.getPostRepository.getAllPosts();
  }

  async getSubPosts(subscriptions) {
    return this.getPostRepository.getSubPosts(subscriptions);
  }
}
