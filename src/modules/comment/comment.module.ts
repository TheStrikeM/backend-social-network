import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostComment, PostCommentSchema } from './schema/PostComment';
import { UserComment, UserCommentSchema } from './schema/UserComment';
import UserCommentRepository from './service/user/user-comment.repository';
import PostCommentRepository from './service/post/post-comment.repository';
import UserModule from '../user/user.module';
import PostModule from '../post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostComment.name, schema: PostCommentSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserComment.name, schema: UserCommentSchema },
    ]),
    UserModule,
    PostModule,
  ],
  providers: [UserCommentRepository, PostCommentRepository],
  exports: [UserCommentRepository, PostCommentRepository],
})
export default class CommentModule {}
