import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { hasRoles } from '../decorator/roles.decorator';
import JwtGuard from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Role, UserVerifiedRegisterDto } from '../../user/dto/UserDto';
import LocalGuard from '../guard/local.guard';
import UserRepository from '../../user/service/user.repository';
import AuthService from '../service/auth.service';

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @Post('reg')
  async register(@Body() dto: UserVerifiedRegisterDto) {
    return this.authService.register(dto);
  }

  @hasRoles(Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'У вас есть права юзера!' };
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const user = await this.userRepository.findById(req.user.id);
    return this.authService.generateToken(user);
  }
}
