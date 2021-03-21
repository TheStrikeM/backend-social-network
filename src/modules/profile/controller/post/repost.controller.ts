import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import RepostsService from '../../service/post/reposts.service';
import { ObjectId } from 'mongoose';
import JwtGuard from '../../../auth/guard/jwt.guard';

export type RepostDto = {
  postId: ObjectId;
};

@Controller('repost')
export default class RepostController {
  constructor(private readonly repostService: RepostsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async addRepost(@Request() req, @Body() dto: RepostDto) {
    return this.repostService.repost(req.user._id, dto.postId);
  }
}
