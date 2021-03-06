import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Role } from '../dto/UserDto';
import { Post } from '../../post/schema/Post';
import { UserComment } from '../../comment/schema/UserComment';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, min: 5, max: 45, required: true, unique: true })
  email: string;

  @Prop({ type: String, min: 5, max: 35, required: true })
  username: string;

  @Prop({ type: String, min: 5, max: 35, required: true })
  full_name: string;

  @Prop({ type: String, min: 5, max: 105 })
  desc: string;

  @Prop({ type: String, min: 5, max: 205, required: true })
  password: string;

  @Prop({ type: String, min: 5, max: 205, default: '' })
  avatar: string;

  @Prop([String])
  photos: string[];

  @Prop({ type: String, min: 5, max: 25, default: 'Не указанно' })
  country: string;

  @Prop({ type: String, min: 5, max: 25, default: 'Не указанно' })
  state: string;

  @Prop({ type: Date, required: true })
  registredIn: Date;

  @Prop({ type: Boolean, default: false })
  verify: boolean;

  @Prop({ type: Boolean, default: false })
  confirmed: boolean;

  @Prop({ type: Boolean, default: false })
  online: boolean;

  @Prop({ type: String, enum: Role, default: 'USER' })
  role: Role;

  @Prop({ type: String })
  website: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscribers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscriptions: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  reposts: Post[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserComment' }],
  })
  comments: UserComment[];

  @Prop()
  postComments: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
