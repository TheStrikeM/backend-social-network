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
import RepostsService from './service/post/reposts.service';
import RepostController from './controller/post/repost.controller';
import PostViewService from './service/post/post-view.service';
import PostViewController from './controller/post/post-view.controller';

@Module({
  imports: [FileModule, UserModule, AuthModule, PostModule, CommentModule],
  providers: [
    ProfileService,
    SubscribeService,
    PhotosService,
    PostService,
    UserCommentService,
    PostCommentService,
    RepostsService,
    PostViewService,
  ],
  controllers: [
    ProfileController,
    SubscribeController,
    PhotosController,
    AvatarController,
    PostController,
    UserCommentController,
    PostCommentController,
    RepostController,
    PostViewController,
  ],
})
export default class ProfileModule {}
