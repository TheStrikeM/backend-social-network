import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export default class FileService {
  createFile(username, fileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuid.v4()}.${fileExtension}`;
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'static',
        username,
        fileType,
      );

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteFile(username, fileType, fileName): string {
    try {
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'static',
        username,
        fileType,
        fileName,
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return `${username}/${fileType}/${fileName}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
