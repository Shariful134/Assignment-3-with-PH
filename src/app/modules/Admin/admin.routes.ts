import express from 'express';
import { adminControllers } from './admin.controllers';
import auth from '../../midleware/auth';
import { USER_ROLE } from '../User/user.contstant';
const router = express.Router();

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
