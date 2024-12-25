import express from 'express';
import { blogControllers } from './blog.controllers';
import validateRequest from '../../midleware/validateRequest';

import { blogValidation } from './blog.validation';
import auth from '../../midleware/auth';
import { USER_ROLE } from '../User/user.contstant';
const router = express.Router();

//creating a Blog
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.blogValidationSchema),
  blogControllers.createBlog,
);

//updating a Blog
router.patch(
  '/:id',
  validateRequest(blogValidation.blogValidationSchema),
  blogControllers.updatedBlog,
);
router.delete('/:id', blogControllers.deleteBlog);

router.get('/', blogControllers.getAllBlogs);

export const BlogRoutes = router;
