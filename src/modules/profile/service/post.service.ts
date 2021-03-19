import { Injectable } from '@nestjs/common';

@Injectable()
export default class PostService {
  constructor() {}

  getSex(): any {
    return { message: 'Привет!' };
  }
}
