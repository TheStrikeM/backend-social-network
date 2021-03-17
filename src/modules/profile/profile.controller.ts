import { Controller, Get, Request } from '@nestjs/common';
import ProfileService from "./profile.service";

@Controller('profile')
export default class ProfileController {
  constructor(
      private readonly profileService: ProfileService
  ) {}

  @Get()
  myProfile(@Request() req): { message: string } {
    return { message: 'Привет, детка!' };
  }
}
