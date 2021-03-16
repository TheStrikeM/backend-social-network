import { Module } from '@nestjs/common';
import FileService from './file.service';

@Module({
  imports: [],
  providers: [FileService],
  exports: [FileService],
})
export default class FileModule {}
