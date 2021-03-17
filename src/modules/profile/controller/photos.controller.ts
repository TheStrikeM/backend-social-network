import {
    Controller, Delete,
    Get,
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

  @Post('avatar')
  getSex(): { message: string } {
    return { message: 'Привет, детка!' };
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
