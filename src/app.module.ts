import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import UserModule from './modules/user/user.module';
import AuthModule from './modules/auth/auth.module';
import FileModule from './modules/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import ProfileModule from './modules/profile/profile.module';
import AdminModule from './modules/admin/admin.module';
import CommentModule from './modules/comment/comment.module';

const dbURI =
  'mongodb+srv://admin:admin@cluster0.ydv37.mongodb.net/social-network?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(dbURI),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    UserModule,
    AuthModule,
    FileModule,
    ProfileModule,
    AdminModule,
    CommentModule,
  ],
})
export class AppModule {}
