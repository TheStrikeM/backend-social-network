import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import UserModule from './modules/user/user.module';
import AuthModule from './modules/auth/auth.module';

const dbURI =
  'mongodb+srv://admin:admin@cluster0.ydv37.mongodb.net/social-network?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(dbURI),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
