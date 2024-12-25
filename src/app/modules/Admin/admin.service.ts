import config from '../../config';
import { TAdmin, TAdminLogin } from './admin.interface';
import { Admin } from './admin.model';
import jwt from 'jsonwebtoken';

// /creating admin
const createAdminIntoDB = async (payload: TAdmin) => {
  const user = await Admin.findOne({ email: payload.email });
  if (user) {
    throw new Error('Admin already exists');
  }

  const result = await Admin.create(payload);
  return result;
};

// creating admin
const loginAdminIntoDB = async (payload: TAdminLogin) => {
  const user = await Admin.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (!user) {
    throw new Error('Admin is not found!');
  }

  //check if the password is correct or uncorrect
  if (!(await Admin.isPasswordMatched(payload?.password, user?.password))) {
    throw new Error(' This Password do not Matched!');
  }

  //creating a token and sent to the client side
  const jwtUserData = {
    // userId: user?._id.toString(),
    userEmail: user?.email,
    role: user?.role,
  };

  //access token
  const accessToken = jwt.sign(
    {
      data: jwtUserData,
    },
    config.jwt_access_secret as string,
    { expiresIn: '20d' },
  );

  return accessToken;
};

export const adminService = {
  createAdminIntoDB,
  loginAdminIntoDB,
};
