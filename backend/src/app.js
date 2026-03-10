import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler, notFound } from '../src/middleware/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import awardRoutes from './routes/award.routes.js';
import categoryRoutes from './routes/category.routes.js';
import clientProfileRoutes from './routes/clientProfile.routes.js';
import developerProfileRoutes from './routes/developerProfile.routes.js';
import matchRoutes from './routes/match.routes.js';
import messageRoutes from './routes/message.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import projectRoutes from './routes/project.routes.js';
import projectRequestRoutes from './routes/projectRequest.routes.js';
import productRoutes from './routes/product.routes.js';
import reviewRoutes from './routes/review.routes.js';
import technologyRoutes from './routes/technology.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware: Logger (dev only)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/client-profiles', clientProfileRoutes);
app.use('/api/developer-profiles', developerProfileRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project-requests', projectRequestRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/technologies', technologyRoutes);
// Legacy/Frontend-friendly routes
app.use('/products', productRoutes);
app.use('/projects', projectRoutes);

//test Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running ' });
});

// Error handling middleware (custom)
app.use(notFound); //404 handler
app.use(errorHandler); //general error handler

export default app;
