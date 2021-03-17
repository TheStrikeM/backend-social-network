import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import PhotosService from '../service/photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtGuard from '../../auth/guard/jwt.guard';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async setAvatar(@UploadedFile() file, @Request() req) {
    return this.photosService.addPhoto(req.user, file);
  }

  @Delete(':fileName')
  @UseGuards(JwtGuard)
  async removeAvatar(@Request() req, @Param('fileName') fileName: string) {
    return this.photosService.removePhoto(req.user, fileName);
  }
}

@Controller('avatar')
export class AvatarController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async setAvatar(@UploadedFile() file, @Request() req) {
    return this.photosService.setAvatar(req.user, file);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async removeAvatar(@Request() req) {
    return this.photosService.removeAvatar(req.user);
  }
}
