import { Module } from '@nestjs/common';
import UserRepository from '../user/service/user.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from './strategy/jwt.strategy';
import LocalStrategy from './strategy/local.strategy';
import CryptoService from './service/crypto.service';
import AuthService from './service/auth.service';
import JwtGuard from './guard/jwt.guard';
import LocalGuard from './guard/local.guard';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    CryptoService,
    AuthService,
    JwtGuard,
    LocalGuard,
    RolesGuard,
  ],
  controllers: [],
  exports: [UserRepository],
})
export default class AuthModule {}
