import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class PostVerifiedDto {
  @MinLength(5, {
    message: 'Ваш юзернейм должен состоять из не менее 5 символов',
  })
  @MaxLength(35, {
    message: 'Ваш юзернейм должен состоять из не менее 35 символов',
  })
  title: string;

  photo?: string;

  @MinLength(5, {
    message: 'Ваш юзернейм должен состоять из не менее 5 символов',
  })
  @MaxLength(35, {
    message: 'Ваш юзернейм должен состоять из не менее 35 символов',
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
