import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { PostComment, PostCommentDocument } from '../../schema/PostComment';
import { InjectModel } from '@nestjs/mongoose';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';

@Injectable()
export default class PostCommentRepository {
  constructor(
    @InjectModel(PostComment.name)
    private readonly postCommentModel: Model<PostCommentDocument>,
  ) {}

  async findById(id: ObjectId): Promise<PostComment> {
    return this.postCommentModel.findById(id);
  }

  async create(dto: PostCommentVerifiedDto): Promise<PostComment> {
    const currentDate = new Date();
    return this.postCommentModel.create({
      ...dto,
      createdIn: currentDate,
      updatedIn: currentDate,
    });
  }

  async update(id: ObjectId, dto: PostCommentVerifiedDto) {
    const candidate = this.findById(id);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    return this.postCommentModel.findByIdAndUpdate(
      { _id: id },
      { ...dto, updatedIn: new Date(), redact: true },
    );
  }

  async delete(id: ObjectId) {
    const candidate = this.findById(id);
    if (!candidate) {
      return { message: 'Комментарий не найден' };
    }

    return this.postCommentModel.findByIdAndDelete({ _id: id });
  }
}
