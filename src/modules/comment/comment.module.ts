import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostComment, PostCommentSchema } from './schema/PostComment';
import { UserComment, UserCommentSchema } from './schema/UserComment';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostComment.name, schema: PostCommentSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserComment.name, schema: UserCommentSchema },
    ]),
  ],
  providers: [],
})
export default class CommentModule {}
