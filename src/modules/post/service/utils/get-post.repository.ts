import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../../schema/Post';
import { Model } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetPostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async getAllPosts(): Promise<PostDocument[]> {
    return this.postModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdAt');
  }

  async getSubPosts(subscribtions: UserDocument[]): Promise<PostDocument[]> {
    return this.postModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdAt');
  }
}
