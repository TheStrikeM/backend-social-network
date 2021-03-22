import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schema/User';
import { Model, ObjectId } from 'mongoose';
import { Continues } from './subscribe.repository';
import PostRepository from '../../../post/service/post.repository';
import UserRepository, { AdvancedRepositoryType } from '../user.repository';
import { Post, PostDocument } from '../../../post/schema/Post';

@Injectable()
export default class RepostsRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async repost(userId: ObjectId, postId: ObjectId) {
    try {
      const continues: Continues = { start: false, message: [] };
      const postCandidate: PostDocument = await this.postRepository.findById(
        postId,
      );
      if (!postCandidate) {
        continues.start = true;
        continues.message.push('Пост не найден');
      }

      const userCandidate: UserDocument = await this.userRepository.findById(
        userId,
      );
      if (!userCandidate) {
        continues.start = true;
        continues.message.push('Пользователь не найден');
      }

      userCandidate.reposts.forEach((repost) => {
        console.log('Это выполняется');
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
        const updUser = this.userRepository.update(userId, {
          reposts: [...userCandidate.reposts, postCandidate._id],
        });

        const updPost = this.postRepository.update(postId, {
          reposts: [...userCandidate.reposts, userCandidate._id],
        });

        return { errors: continues.start, message: 'Репост успешно совершен!' };
      }

      return { errors: continues.start, message: continues.message };
    } catch (e) {
      console.log('Error ' + e);
    }
  }
}
