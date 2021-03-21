import { Module } from '@nestjs/common';
import ProfileService from './service/profile.service';
import ProfileController from './controller/profile.controller';
import FileModule from '../file/file.module';
import UserModule from '../user/user.module';
import AuthModule from '../auth/auth.module';
import SubscribeService from './service/subscribe.service';
import PhotosService from './service/photos.service';
import SubscribeController from './controller/subscribe.controller';
import {
  AvatarController,
  PhotosController,
} from './controller/photos.controller';
import PostModule from '../post/post.module';
import PostController from './controller/post/post.controller';
import PostService from './service/post/post.service';
import CommentModule from '../comment/comment.module';
import UserCommentController from './controller/user-comment.controller';
import PostCommentController from './controller/post/post-comment.controller';
import UserCommentService from './service/user-comment.service';
import PostCommentService from './service/post/post-comment.service';

@Module({
  imports: [FileModule, UserModule, AuthModule, PostModule, CommentModule],
  providers: [
    ProfileService,
    SubscribeService,
    PhotosService,
    PostService,
    UserCommentService,
    PostCommentService,
  ],
  controllers: [
    ProfileController,
    SubscribeController,
    PhotosController,
    AvatarController,
    PostController,
    UserCommentController,
    PostCommentController,
  ],
})
export default class ProfileModule {}
