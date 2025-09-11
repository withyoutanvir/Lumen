import express from 'express';
import bodyParser from 'body-parser';

import userRoutes from './routes/User.routes.js';
import transactionRoutes from './routes/Transaction.routes.js'; // ✅ match your file name
import mailRouter from './routes/mail.router.js';
import supplierRoutes from './routes/supplier.route.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api', mailRouter);
app.use('/api/suppliers', supplierRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

export default app;
