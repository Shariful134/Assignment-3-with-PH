import { Response } from 'express';
type TResponse = {
  statusCode: number;
  success: boolean;
  message?: string;
};

export const sendRespons = (res: Response, data: TResponse) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
  });
};
