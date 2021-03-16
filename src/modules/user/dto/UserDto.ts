import { ObjectId } from 'mongoose';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEDIA = 'MEDIA',
}

export type UserDto = {
  readonly _id?: number;
  readonly email?: string;
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
