import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';

export type PostDocument = PopStateEvent & Document;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;

  @Prop({ type: String, min: 5, max: 25, required: true })
  title: string;

  @Prop({ type: String, min: 5, max: 25, required: true })
  desc: string;

  @Prop({ type: String, default: '' })
  photo: string;

  @Prop({ type: Date, required: true })
  createdIn: Date;

  @Prop()
  comments: string[];

  @Prop()
  reposts: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
