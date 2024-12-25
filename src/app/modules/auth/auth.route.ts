import express from 'express';
import validateRequest from '../../midleware/validateRequest';
import { userValidation } from '../User/user.validation';
import { authContarollers } from './auth.controllers';
import { authValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  authContarollers.registerUser,
);
router.post(
  '/login',
  validateRequest(authValidations.loginValidationschema),
  authContarollers.loginUser,
);

export const UserRoutes = router;
