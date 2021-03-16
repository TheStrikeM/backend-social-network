import { Module } from '@nestjs/common';
import UserRepository from '../user/service/user.repository';

@Module({
  imports: [],
  providers: [],
  controllers: [],
  exports: [UserRepository],
})
export default class AuthModule {}
