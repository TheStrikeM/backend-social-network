import { Module } from '@nestjs/common';
import ProfileService from './profile.service';
import ProfileController from './profile.controller';
import FileModule from '../file/file.module';
import UserModule from '../user/user.module';
import AuthModule from '../auth/auth.module';

@Module({
  imports: [FileModule, UserModule, AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export default class ProfileModule {}
