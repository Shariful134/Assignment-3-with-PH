/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
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
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User Blocked Successfully!',
      data: result,
    });
  },
);

// Delete Blog by Admin
const deleteBlogController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result = await adminService.deleteBlogbyAdminIntoDB(id);
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Blog Deleted Successfully!',
      data: result,
    });
  },
);

export const adminControllers = {
  adminController,
  adminLoginController,
  blockedUserController,
  deleteBlogController,
};
