import authRoutes from './auth.routes.js';
import awardRoutes from './award.routes.js';
import categoryRoutes from './category.routes.js';
import clientProfileRoutes from './clientProfile.routes.js';
import developerProfileRoutes from './developerProfile.routes.js';
import matchRoutes from './match.routes.js';
import messageRoutes from './message.routes.js';
import notificationRoutes from './notification.routes.js';
import projectRoutes from './project.routes.js';
import projectRequestRoutes from './projectRequest.routes.js';
import productRoutes from './product.routes.js';
import reviewRoutes from './review.routes.js';
import technologyRoutes from './technology.routes.js';
import userRoutes from './user.routes.js';

const apiRoutes = [
  { path: '/api/auth', router: authRoutes },
  { path: '/api/awards', router: awardRoutes },
  { path: '/api/categories', router: categoryRoutes },
  { path: '/api/client-profiles', router: clientProfileRoutes },
  { path: '/api/developer-profiles', router: developerProfileRoutes },
  { path: '/api/matches', router: matchRoutes },
  { path: '/api/messages', router: messageRoutes },
  { path: '/api/notifications', router: notificationRoutes },
  { path: '/api/projects', router: projectRoutes },
  { path: '/api/project-requests', router: projectRequestRoutes },
  { path: '/api/reviews', router: reviewRoutes },
  { path: '/api/technologies', router: technologyRoutes },
  { path: '/api/user', router: userRoutes },
  { path: '/api/users', router: userRoutes },
  { path: '/api/product', router: productRoutes },
  { path: '/api/products', router: productRoutes },
];

const legacyRoutes = [
  { path: '/products', router: productRoutes },
  { path: '/projects', router: projectRoutes },
];

export const registerRoutes = (app) => {
  for (const { path, router } of apiRoutes) {
    app.use(path, router);
  }
  for (const { path, router } of legacyRoutes) {
    app.use(path, router);
  }
};

