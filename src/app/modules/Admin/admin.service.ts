import { HttpStatus } from 'http-status-ts';
import config from '../../config';
import AppError from '../../errors/AppError';
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';
import { TAdmin, TAdminLogin } from './admin.interface';
import { Admin } from './admin.model';
import jwt from 'jsonwebtoken';

// creating admin
const createAdminIntoDB = async (payload: TAdmin) => {
  const user = await Admin.findOne({ email: payload.email });
  if (user) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Admin already exists');
  }

  const result = await Admin.create(payload);
  return result;
};

// creating admin
const loginAdminIntoDB = async (payload: TAdminLogin) => {
  const user = await Admin.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (!user) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  //check if the password is correct or uncorrect
  if (!(await Admin.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
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

//Blocked User by admin
const blockedUserByAdminIntoDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const user = await User.findById(id);

  //check if the user is exists
  if (!user) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  //check if user is blocked or unblocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'User Allready Blocked!');
  }

  const result = await User.findByIdAndUpdate(id, payload);
  return result;
};

// Delete Blog By Admin
const deleteBlogbyAdminIntoDB = async (id: string) => {
  const blog = await Blog.findById(id);

  //check if the user is Exists
  if (!blog) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Blog is not Found!');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const adminService = {
  createAdminIntoDB,
  loginAdminIntoDB,
  blockedUserByAdminIntoDB,
  deleteBlogbyAdminIntoDB,
};
