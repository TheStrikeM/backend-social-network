import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post, Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import PostService from '../../service/post/post.service';
import JwtGuard from '../../../auth/guard/jwt.guard';
import { PostDto, PostVerifiedDto } from '../../../post/dto/PostDto';
import { ObjectId } from 'mongoose';

@Controller('post')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createPost(@Body() dto: PostVerifiedDto, @Request() req) {
    return this.postService.addPost(req.user._id, dto);
  }

  @Get(':id')
  async findById(@Param('id') id: ObjectId) {
    return this.postService.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deletePost(@Request() req, @Param('id') postId: ObjectId) {
    return this.postService.deletePost(postId, req.user._id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async changePost(
    @Request() req,
    @Param('id') postId: ObjectId,
    @Body() dto: PostDto,
  ) {
    return this.postService.changePost(req.user._id, postId, dto);
  }
}
