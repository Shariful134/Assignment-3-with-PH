/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import { sendRespons, sendResponse } from '../../utils/sendResponse';
import { adminService } from './admin.service';
import catchAsync from '../../utils/catchAsync';
import { HttpStatus } from 'http-status-ts';

//creating admin
const adminController: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await adminService.createAdminIntoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Admin creted is Successfully!',
    data: result,
  });
});

//login admin
const adminLoginController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await adminService.loginAdminIntoDB(req.body);
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Admin login  Successfully!',
      data: result,
    });
  },
);

// Blocked User
const blockedUserController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { userId } = req.params;
    const payload = req.body;
    const result = await adminService.blockedUserByAdminIntoDB(userId, payload);
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
    const result = await adminService.deleteBlogbyAdminIntoDB(id);
    sendRespons(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Blog Deleted Successfully!',
    });
  },
);

export const adminControllers = {
  adminController,
  adminLoginController,
  blockedUserController,
  deleteBlogController,
};
