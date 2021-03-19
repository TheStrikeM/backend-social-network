import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class PostVerifiedDto {
  @MinLength(5, {
    message: 'Название поста должно состоять из не менее 5 символов',
  })
  @MaxLength(65, {
    message: 'Название поста должно состоять из не менее 65 символов',
  })
  title: string;

  photo?: string;

  @MinLength(5, {
    message: 'Описание поста должно состоять из не менее 5 символов',
  })
  @MaxLength(335, {
    message: 'Описание поста должно состоять из не менее 335 символов',
  })
  desc: string;
}

export type PostDto = {
  readonly _id?: ObjectId;
  readonly authorId?: ObjectId[];
  readonly title?: string;
  readonly photo?: string;
  readonly desc?: string;
  readonly createdId?: Date;
  readonly comments?: ObjectId[];
  readonly reposts?: ObjectId[];
};
