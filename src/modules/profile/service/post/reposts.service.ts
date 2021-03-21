import { Injectable } from '@nestjs/common';
import RepostsRepository from '../../../user/service/utils/reposts.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export default class RepostsService {
  constructor(private readonly repostsRepository: RepostsRepository) {}

  async repost(userId: ObjectId, postId: ObjectId) {
    return this.repostsRepository.repost(userId, postId);
  }
}
