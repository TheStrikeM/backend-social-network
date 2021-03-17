import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/User';
import UserRepository from './service/user.repository';
import SubscribeRepository from './service/utils/subscribe.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository, SubscribeRepository],
  exports: [UserRepository, SubscribeRepository],
})
export default class UserModule {}
