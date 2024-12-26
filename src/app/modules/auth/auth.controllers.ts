/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';

//registration User
const registerUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await authServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

//login User
const loginUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Login Successfully!',
    data: result,
  });
});

export const authContarollers = {
  registerUser,
  loginUser,
};
