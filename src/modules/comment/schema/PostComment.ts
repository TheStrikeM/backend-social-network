import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from '../../post/schema/Post';
import { User } from '../../user/schema/User';

export type PostCommentDocument = PostComment & Document;

@Schema()
export class PostComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: Date, required: true })
  createdIn: Date;

  @Prop({ type: Date })
  updatedIn: Date;

  @Prop({ type: Boolean, default: false })
  redact: boolean;

  @Prop()
  likes: string[];
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
