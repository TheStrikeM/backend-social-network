import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

const dbURI =
  'mongodb+srv://admin:admin@cluster0.ydv37.mongodb.net/social-network?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(dbURI), ConfigModule.forRoot()],
})
export class AppModule {}
