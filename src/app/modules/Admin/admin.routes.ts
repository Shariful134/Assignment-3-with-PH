import express from 'express';
import { adminControllers } from './admin.controllers';
import { adminValidation } from './admin.validation';
import validateRequest from '../../midleware/validateRequest';
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

export const adminRoutes = router;
