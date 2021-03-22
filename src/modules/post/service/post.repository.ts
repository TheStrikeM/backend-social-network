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

  async create(dto) {
    return this.postModel.create({ ...dto });
  }

  async update(id: ObjectId | Post, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'Пост не найден' };
    }

    return this.postModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: Post = await this.findById(id);
    if (!candidate) {
      return { message: 'Пост не найден' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'Вы не являетесь автором данного поста' };
    }

    return this.postModel.findByIdAndDelete({ _id: id });
  }

  async findById(id: ObjectId | Post) {
    const candidate = await this.postModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
