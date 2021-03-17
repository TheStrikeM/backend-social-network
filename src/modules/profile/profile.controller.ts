import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import JwtGuard from '../auth/guard/jwt.guard';
import ProfileService from './profile.service';

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

  @Get()
  @UseGuards(JwtGuard)
  async subscribeTo(@Request() req) {}
}
