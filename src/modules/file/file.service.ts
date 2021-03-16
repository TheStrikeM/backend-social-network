import { Injectable } from '@nestjs/common';

@Injectable()
export default class FileService {
  constructor() {}

  createFile(file): string {
    const fileExtension = file.originalname.split('.').pop;
    return 'Привет';
  }
}
