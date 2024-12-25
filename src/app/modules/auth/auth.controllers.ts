/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.service';

//registration User
const registerUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await authServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Registration is Successfully!',
    data: result,
  });
});

//login User
const loginUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'User Login Successfully!',
    data: result,
  });
});

export const authContarollers = {
  registerUser,
  loginUser,
};
