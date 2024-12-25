/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TAdmin = {
  name: string;
  email: string;
  password: string;
  role: string;
};
export type TAdminLogin = {
  email: string;
  password: string;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExistsByEmail(email: string): Promise<TAdmin>;
  isPasswordMatched(
    planTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
