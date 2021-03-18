import { Injectable } from '@nestjs/common';
import AdminRepository from '../../user/service/utils/admin.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export default class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async socialOnline() {
    return this.adminRepository.socialOnline();
  }

  async getAllUsers(limit: number) {
    return this.adminRepository.getAllUsers(limit);
  }

  async deleteUser(id: ObjectId) {
    return this.adminRepository.deleteUser(id);
  }
}
