import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'http-status-ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !',
    error: '',
  });
};
export default notFound;