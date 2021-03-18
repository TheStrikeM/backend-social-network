import { Injectable } from '@nestjs/common';

@Injectable()
export default class AdminService {
  constructor() {}

  getSex(): any {
    return { message: 'Привет!' };
  }
}
