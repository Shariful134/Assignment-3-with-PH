/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.contstant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    planTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
