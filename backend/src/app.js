import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


import subscriptionRoutes from './routes/subscriptionRoutes.js';
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes); 




// Add a root route for health check or browser testing
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

export default app;
