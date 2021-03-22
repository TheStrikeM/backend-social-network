import { Controller, Request, UseGuards, Param, Get } from '@nestjs/common';
import RepostsService from '../../service/post/reposts.service';
import { ObjectId } from 'mongoose';
import JwtGuard from '../../../auth/guard/jwt.guard';

export type RepostDto = {
  postId: ObjectId;
};

@Controller('repost')
export default class RepostController {
  constructor(private readonly repostService: RepostsService) {}

  @Get(':postId')
  @UseGuards(JwtGuard)
  async addRepost(@Request() req, @Param('postId') postId: ObjectId) {
    console.log('Controller', postId, req.user._id);
    return this.repostService.repost(req.user._id, postId);
  }
}
