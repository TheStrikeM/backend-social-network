import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/Post';
import PostRepository from './service/post.repository';
import UserModule from '../user/user.module';
import GetPostRepository from './service/utils/get-post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [PostRepository, GetPostRepository],
  controllers: [],
  exports: [PostRepository, GetPostRepository],
})
export default class PostModule {}
