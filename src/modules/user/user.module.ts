import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/User';
import UserRepository from './service/user.repository';
import SubscribeRepository from './service/utils/subscribe.repository';
import PhotosRepository from './service/utils/photos.repository';
import AdminRepository from './service/utils/admin.repository';
import CommentModule from '../comment/comment.module';
import PostModule from "../post/post.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PostModule,
  ],
  providers: [
    UserRepository,
    SubscribeRepository,
    PhotosRepository,
    AdminRepository,
  ],
  exports: [
    UserRepository,
    SubscribeRepository,
    PhotosRepository,
    AdminRepository,
  ],
})
export default class UserModule {}
