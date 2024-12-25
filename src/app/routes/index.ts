import { Router } from 'express';
import { BlogRoutes } from '../modules/Blog/blog.routes';
import { UserRoutes } from '../modules/auth/auth.route';
import { adminRoutes } from '../modules/Admin/admin.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
