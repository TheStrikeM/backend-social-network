import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import UserModule from '../user/user.module';
import AdminService from './service/admin.service';
import AdminController from './controller/admin.controller';

@Module({
  imports: [AuthModule, UserModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export default class AdminModule {}
