import { Response } from 'express';
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

type TRespons = {
  statusCode: number;
  success: boolean;
  message?: string;
};

export const sendRespons = (res: Response, data: TRespons) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
  });
};
