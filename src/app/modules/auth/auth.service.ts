import { HttpStatus } from 'http-status-ts';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TUserLogin } from './auth.interface';

import jwt from 'jsonwebtoken';

const registerUserIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'User already exists');
  }

  const result = await User.create(payload);

  return result;
};

//loginUser
const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  //   console.log(user?._id.toString());

  //checking user is exists
  if (!user) {
    throw new Error('User is not found!');
  }

  //checking user isBlocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new Error('This Usre is Allready Blocked!');
  }

  //check if the password is correct or uncorrect
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new Error(' This Password do not Matched!');
  }

  //creating a token and sent to the client side
  const jwtUserData = {
    // userId: user?._id.toString(),
    userEmail: user?.email,
    role: user?.role,
  };

  //access token
  const accessToken = jwt.sign(
    {
      data: jwtUserData,
    },
    config.jwt_access_secret as string,
    { expiresIn: '20d' },
  );

  return accessToken;
};

export const authServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
