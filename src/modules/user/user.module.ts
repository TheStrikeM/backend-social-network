import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/User';
import UserRepository from './service/user.repository';
import SubscribeRepository from './service/utils/subscribe.repository';
import PhotosRepository from './service/utils/photos.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository, SubscribeRepository, PhotosRepository],
  exports: [UserRepository, SubscribeRepository, PhotosRepository],
})
export default class UserModule {}
