import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import JwtGuard from '../../auth/guard/jwt.guard';
import UserCommentService from '../service/user-comment.service';
import { UserCommentVerifiedDto } from '../../comment/dto/UserCommentDto';

@Controller('usercomment')
export default class UserCommentController {
  constructor(private readonly userCommentService: UserCommentService) {}

  @Get(':id')
  async getCommentById(@Param('id') commentId) {
    return this.userCommentService.findByCommentId(commentId);
  }

  @Post(':userId')
  @UseGuards(JwtGuard)
  async createComment(
    @Param('userId') userId,
    @Body() dto: UserCommentVerifiedDto,
    @Request() req,
  ) {
    return this.userCommentService.addCommentToPost(req.user_id, userId, dto);
  }

  @Put(':commentId')
  @UseGuards(JwtGuard)
  async updateComment(
    @Param('commentId') commentId,
    @Body() dto: UserCommentVerifiedDto,
    @Request() req,
  ) {
    return this.userCommentService.updateComment(commentId, req.user._id, dto);
  }

  @Delete(':commentId')
  @UseGuards(JwtGuard)
  async deleteComment(@Param('commentId') commentId, @Request() req) {
    return this.userCommentService.deleteComment(commentId, req.user._id);
  }
}
