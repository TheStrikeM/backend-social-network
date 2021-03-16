import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import UserModule from './modules/user/user.module';
import AuthModule from './modules/auth/auth.module';
import FileModule from './modules/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

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
  ],
})
export class AppModule {}
