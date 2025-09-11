import express from 'express';
import userRoutes from './routes/User.routes.js';
import bodyParser from "body-parser";
import transactionRoutes from './routes/Transaction.routes.js';
const app = express();
import mailrouter from "./routes/mail.router.js";
import supplierRoutes from "./routes/supplier.route.js";
app.use(express.json());
app.use('/', userRoutes);

app.use(bodyParser.json());
app.use("/api/suppliers", supplierRoutes);
app.use("/api", mailrouter);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;