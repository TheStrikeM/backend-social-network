import { Injectable } from '@nestjs/common';

@Injectable()
export default class AuthService {
  constructor() {}

  getSex(): any {
    return { message: 'Привет!' };
  }
}
