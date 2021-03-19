import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';

export type UserCommentDocument = UserComment & Document;

@Schema()
export class UserComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

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

export const UserCommentSchema = SchemaFactory.createForClass(UserComment);
