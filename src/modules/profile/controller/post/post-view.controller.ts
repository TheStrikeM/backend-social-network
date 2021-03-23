import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import PostViewService from '../../service/post/post-view.service';
import JwtGuard from '../../../auth/guard/jwt.guard';

@Controller('getposts')
export default class PostViewController {
  constructor(private readonly postViewService: PostViewService) {}

  @Get('all')
  @UseGuards(JwtGuard)
  async getAllPosts() {
    return this.postViewService.getAllPosts();
  }

  @Get('sub')
  @UseGuards(JwtGuard)
  async getSubPosts(@Request() req) {
    console.log(req.user)
    return this.postViewService.getSubPosts(req.user.subscriptions);
  }
}
