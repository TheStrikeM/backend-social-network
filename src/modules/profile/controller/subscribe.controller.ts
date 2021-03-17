import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import JwtGuard from '../../auth/guard/jwt.guard';
import { ObjectId } from 'mongoose';
import SubscribeService from '../service/subscribe.service';

@Controller('sub')
export default class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Get('subscribe/:id')
  @UseGuards(JwtGuard)
  async subscribeTo(@Request() req, @Param('id') recipientId: ObjectId) {
    return this.subscribeService.subscribeTo(req.user._id, recipientId);
  }

  @Get('unsubscribe/:id')
  @UseGuards(JwtGuard)
  async unsubscribeTo(@Request() req, @Param('id') recipientId: ObjectId) {
    return this.subscribeService.unsubscribeTo(req.user._id, recipientId);
  }
}
