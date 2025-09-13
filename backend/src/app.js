import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import Planrouter from './routes/planroute.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

import subscriptionRoutes from './routes/subscriptionRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import analyticRoutes from './routes/analyticRoutes.js';

app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticRoutes);
app.use('/api/plans', Planrouter);

// Add a root route for health check or browser testing
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(errorHandler);

export default app;