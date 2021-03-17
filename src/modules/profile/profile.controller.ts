import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import JwtGuard from '../auth/guard/jwt.guard';
import ProfileService from './profile.service';
import { ObjectId } from 'mongoose';

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

  @Get('subscribeTo/:id')
  @UseGuards(JwtGuard)
  async subscribeTo(@Request() req, @Param('id') recipientId: ObjectId) {
    return this.profileService.subscribeTo(req.user._id, recipientId);
  }

  @Get('unsubscribeTo/:id')
  @UseGuards(JwtGuard)
  async unsubscribeTo(@Request() req, @Param('id') recipientId: ObjectId) {
    return this.profileService.unsubscribeTo(req.user._id, recipientId);
  }
}
