import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class UserCommentVerifiedDto {
  @MinLength(5, {
    message: 'Текст поста должно состоять из не менее 5 символов',
  })
  @MaxLength(65, {
    message: 'Текст поста должно состоять из не менее 65 символов',
  })
  text: string;
}

export type UserCommentDto = {
  readonly userId: ObjectId;
  readonly authorId: ObjectId;
  readonly text: string;
  readonly createdIn: Date;
  readonly updatedIn: Date;
  readonly redact: boolean;
  readonly likes: string[];
};
