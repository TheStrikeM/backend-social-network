import {Controller, Delete, Get, Param, Query, UseGuards} from '@nestjs/common';
import { hasRoles } from 'src/modules/auth/decorator/roles.decorator';
import JwtGuard from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import {Role} from "../../user/dto/UserDto";
import AdminService from "../service/admin.service";
import {ObjectId} from "mongoose";

@Controller('admin')
export default class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('online')
  @hasRoles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  async socialOnline() {
    return this.adminService.socialOnline();
  }

  @Get('users')
  @hasRoles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  async getAllUsers(@Query('limit') limit: number) {
    return this.adminService.getAllUsers(limit);
  }

  @Delete('delete/user/:id')
  @hasRoles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  async deleteUser(@Param('id') id: ObjectId) {
    return this.adminService.deleteUser(id);
  }
}
