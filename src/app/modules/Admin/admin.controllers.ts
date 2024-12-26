/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import { adminService } from './admin.service';
import catchAsync from '../../utils/catchAsync';
import { HttpStatus } from 'http-status-ts';
import { sendRespons } from '../../utils/sendRespons';

// Blocked User
const blockedUserController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { userId } = req.params;
    await adminService.blockedUserByAdminIntoDB(userId);
    sendRespons(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User Blocked Successfully!',
    });
  },
);

// Delete Blog by Admin
const deleteBlogController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    await adminService.deleteBlogbyAdminIntoDB(id);
    sendRespons(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Blog Deleted Successfully!',
    });
  },
);

export const adminControllers = {
  blockedUserController,
  deleteBlogController,
};
