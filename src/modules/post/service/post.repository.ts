import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schema/Post';
import { Model, ObjectId } from 'mongoose';
import { PostDto } from '../dto/PostDto';

@Injectable()
export default class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async findByTitle(title: string) {
    return this.postModel.find({ title });
  }

  async create(dto: PostDto) {
    return this.postModel.create({ ...dto });
  }

  async update(id: ObjectId, dto) {
    return this.postModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId) {
    return this.postModel.findByIdAndDelete({ _id: id });
  }
}
