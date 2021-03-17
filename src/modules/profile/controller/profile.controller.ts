import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import JwtGuard from '../../auth/guard/jwt.guard';
import ProfileService from '../service/profile.service';
import { UserDto } from '../../user/dto/UserDto';

@Controller('profile')
export default class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('my')
  @UseGuards(JwtGuard)
  async myProfile(@Request() req) {
    return this.profileService.myProfile(req.user._id);
  }

  @Get(':username')
  async getProfile(@Param('username') username: string) {
    return this.profileService.getProfile(username);
  }

  @Put()
  @UseGuards(JwtGuard)
  async update(@Body() dto: UserDto, @Request() req) {
    return this.profileService.update(req.user._id, dto);
  }
}
