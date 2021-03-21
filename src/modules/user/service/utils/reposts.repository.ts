import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schema/User';
import { Model, ObjectId } from 'mongoose';
import { Continues } from './subscribe.repository';
import PostRepository from '../../../post/service/post.repository';
import { AdvancedRepositoryType } from '../user.repository';

@Injectable()
export default class RepostsRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly postRepository: PostRepository,
  ) {}

  async repost(
    postId: ObjectId,
    userId: ObjectId,
  ): Promise<AdvancedRepositoryType<any[]> | AdvancedRepositoryType<string[]>> {
    const continues: Continues = { start: false, message: [] };

    const postCandidate = await this.postRepository.findById(postId);
    if (!postCandidate) {
      continues.start = true;
      continues.message.push('Пост не найден');
    }

    const userCandidate = await this.userModel.findById(userId);
    if (!userCandidate) {
      continues.start = true;
      continues.message.push('Пользователь не найден');
    }

    userCandidate.reposts.forEach((repost) => {
      if (String(repost) === String(postId)) {
        continues.start = true;
        continues.message.push(
          'Данный репост уже существует у вас на странице',
        );
      }
    });

    userCandidate.posts.forEach((post) => {
      if (String(post) === String(postId)) {
        continues.start = true;
        continues.message.push('Вы не можете репостнуть свой пост.');
      }
    });

    if (!continues.start) {
      const updUser = this.userModel.findByIdAndUpdate(
        { _id: userId },
        { reposts: [...userCandidate.reposts, postCandidate._id] },
      );

      const updPost = this.postRepository.update(postId, {
        reposts: [...userCandidate.reposts, userCandidate._id],
      });

      return { errors: continues.start, message: [updUser, updPost] };
    }

    return { errors: continues.start, message: continues.message };
  }
}
