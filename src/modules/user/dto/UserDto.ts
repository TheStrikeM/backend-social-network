import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEDIA = 'MEDIA',
}

export const AdminRole = [Role.USER, Role.MANAGER, Role.MEDIA, Role.ADMIN];
export const UserRole = [Role.USER];
export const ManagerRole = [Role.USER, Role.MANAGER, Role.MEDIA];
export const MediaRole = [Role.USER, Role.MEDIA];

export type UserLoginDto = {
  username: string;
  password: string;
};

export type UserRegisterDto = {
  username: string;
  role?: Role;
  email: string;
  full_name: string;
  password: string;
};

export class UserVerifiedLoginDto {
  @MinLength(5, {
    message: 'Ваш юзернейм должен состоять из не менее 5 символов',
  })
  @MaxLength(35, {
    message: 'Ваш юзернейм должен состоять из не менее 35 символов',
  })
  username: string;

  @MinLength(5, {
    message: 'Ваш пароль должен состоять из не менее 5 символов',
  })
  @MaxLength(25, {
    message: 'Ваш пароль должен состоять из не менее 25 символов',
  })
  password: string;

  @MinLength(5, {
    message: 'Ваш эмеил должен состоять из не менее 5 символов',
  })
  @MaxLength(45, {
    message: 'Ваш эмеил должен состоять из не менее 45 символов',
  })
  email: string;
}

export class UserVerifiedRegisterDto extends UserVerifiedLoginDto {
  @MinLength(5, {
    message: 'Ваше имя должен состоять из не менее 5 символов',
  })
  @MaxLength(35, {
    message: 'Ваше имя и фамилия должен состоять из не менее 35 символов',
  })
  full_name: string;

  role: Role = Role.USER;
}

export type UserDto = {
  readonly _id?: ObjectId;
  readonly email?: string;
  readonly username?: string;
  readonly full_name?: string;
  readonly desc?: string;
  readonly password?: string;
  readonly avatar?: string;
  readonly photos?: string[];
  readonly country?: string;
  readonly state?: string;
  readonly registredIn?: Date;
  readonly verify?: boolean;
  readonly confirmed?: boolean;
  readonly online?: boolean;
  readonly role?: Role;
  readonly website?: string;
  readonly friends?: ObjectId[];
  readonly subscribers?: ObjectId[];
  readonly subscriptions?: ObjectId[];
  readonly posts?: string[];
  readonly reposts?: string[];
  readonly comments?: string[];
  readonly postComments?: string[];
};
