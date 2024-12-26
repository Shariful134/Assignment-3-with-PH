import express from 'express';
import { adminControllers } from './admin.controllers';
import { adminValidation } from './admin.validation';
import validateRequest from '../../midleware/validateRequest';
import auth from '../../midleware/auth';
import { USER_ROLE } from '../User/user.contstant';
const router = express.Router();

//creating admin
router.post(
  '/create-admin',
  validateRequest(adminValidation.adminValidationSchema),
  adminControllers.adminController,
);

//login admin
router.post(
  '/login',
  validateRequest(adminValidation.adminLoginValidationSchema),
  adminControllers.adminLoginController,
);

// Blocked User
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminControllers.blockedUserController,
);

// delete Blog
router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  adminControllers.deleteBlogController,
);

export const adminRoutes = router;
