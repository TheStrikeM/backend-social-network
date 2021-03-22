import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/Post';
import PostRepository from './service/post.repository';
import UserModule from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [PostRepository],
  controllers: [],
  exports: [PostRepository],
})
export default class PostModule {}
