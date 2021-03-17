import { Module } from '@nestjs/common';
import ProfileService from './service/profile.service';
import ProfileController from './profile.controller';
import FileModule from '../file/file.module';
import UserModule from '../user/user.module';
import AuthModule from '../auth/auth.module';
import SubscribeService from './service/subscribe.service';
import PhotosService from './service/photos.service';

@Module({
  imports: [FileModule, UserModule, AuthModule],
  providers: [ProfileService, SubscribeService, PhotosService],
  controllers: [ProfileController],
})
export default class ProfileModule {}
