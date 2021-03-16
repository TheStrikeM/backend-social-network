import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export default class AuthController {
  constructor() {}

  @Get()
  getSex(): { message: string } {
    return { message: 'Привет, детка!' };
  }
}
