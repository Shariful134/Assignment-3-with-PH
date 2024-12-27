import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

//Blocked User by admin
const blockedUserByAdminIntoDB = async (id: string) => {
  const user = await User.findById(id);

  //check if the user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not Found!');
  }

  //check if the user is user or admin

  if (user.role === 'admin') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //check if user is blocked or unblocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User Allready Blocked!');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

// Delete Blog By Admin
const deleteBlogbyAdminIntoDB = async (id: string) => {
  const blog = await Blog.findById(id);

  //check if the user is Exists
  if (!blog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog is not Found!');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const adminService = {
  blockedUserByAdminIntoDB,
  deleteBlogbyAdminIntoDB,
};
