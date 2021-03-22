import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schema/Post';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Автор поста не найден' };
    }

    const newPost: PostDocument = await this.postModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      posts: [...userProfile.posts, newPost._id],
    });
    return newPost;
  }

  async update(id: ObjectId | Post, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'Пост не найден' };
    }

    return this.postModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: PostDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'Пост не найден' };
    }
    if (!userCandidate) {
      return { message: 'Юзер не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Вы не являетесь автором данного поста' };
    }

    userCandidate.posts.forEach((post) => {
      if (String(post) === String(id)) {
        continues = true;
      }
    });

    const filteredPosts = userCandidate.posts.filter(
      (post) => String(post) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        posts: filteredPosts,
      });

      return this.postModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'Поста не было найдено в юзере' };
  }

  async findById(id: ObjectId | Post) {
    const candidate = await this.postModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
