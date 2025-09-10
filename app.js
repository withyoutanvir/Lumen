import express from 'express';
import userRoutes from './routes/User.routes.js';

const app = express();

app.use(express.json());
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;