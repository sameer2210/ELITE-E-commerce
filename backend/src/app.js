import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import { registerRoutes } from './routes/index.js';

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

registerRoutes(app);

//test Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running ' });
});

// Error handling middleware (custom)
app.use(notFound); //404 handler
app.use(errorHandler); //general error handler

export default app;
