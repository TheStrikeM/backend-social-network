import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserRepository {
  constructor() {}

  getSex(): any {
    return { message: 'Привет!' };
  }
}
