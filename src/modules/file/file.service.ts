import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export default class FileService {
  createFile(file): string {
    try {
      const fileExtension = file.originalname.split('.').pop;
      const fileName = `${uuid.v4()}.${fileExtension()}`;
      const filePath = path.resolve(__dirname, '..', '..', 'static', 'img');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      return fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
