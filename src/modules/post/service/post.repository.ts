import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schema/Post';
import { Model } from 'mongoose';

@Injectable()
export default class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  getSex(): any {
    return { message: 'Привет!' };
  }
}
