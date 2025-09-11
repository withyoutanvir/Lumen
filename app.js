import express from 'express';
import userRoutes from './routes/User.routes.js';
import transactionRoutes from './routes/transactionRoutes.js';
const app = express();

app.use(express.json());
app.use('/', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;