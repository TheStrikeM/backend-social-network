import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Role} from "../dto/UserDto";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, min: 5, max: 35, required: true, unique: true })
  email: string;

  @Prop({ type: Number, min: 5, max: 35, required: true })
  full_name: number;

  @Prop({ type: String, min: 5, max: 105 })
  desc: string;

  @Prop({ type: String, min: 5, max: 105, required: true })
  password: string;

  @Prop({ type: String, min: 5, max: 205, default: 'Нет' })
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

  @Prop({ type: String, enum: Role })
  role: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscribers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscriptions: User[];

  @Prop()
  posts: string[];

  @Prop()
  reposts: string[];

  @Prop()
  comments: string[];

  @Prop()
  postComments: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
