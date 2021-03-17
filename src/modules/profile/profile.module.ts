import { Module } from '@nestjs/common';
import ProfileService from './profile.service';
import ProfileController from './profile.controller';
import AuthModule from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export default class ProfileModule {}
