import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //if the token is sent to the client side
    if (!token) {
      throw new Error('Your are not Authorized');
    }

    //check if the token is valid

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (error, decoded) {
        console.log(decoded);
        if (error) {
          throw new Error('Your are not Authorized!');
        }
        const role = (decoded as JwtPayload)?.data?.role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new Error('Your are not Authorized!');
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
