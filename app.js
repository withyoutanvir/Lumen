import express from 'express';
import userRoutes from './routes/User.routes.js';
<<<<<<< HEAD
import bodyParser from "body-parser";
=======
import transactionRoutes from './routes/transactionRoutes.js';
>>>>>>> ec769bcd180b1bed5096134444b068a923219d06
const app = express();
import mailrouter from "./routes/mail.router.js";
import supplierRoutes from "./routes/supplier.route.js";
app.use(express.json());
app.use('/', userRoutes);
<<<<<<< HEAD
app.use(bodyParser.json());
app.use("/api/suppliers", supplierRoutes);
app.use("/api", mailrouter);
=======
app.use('/api/transactions', transactionRoutes);
>>>>>>> ec769bcd180b1bed5096134444b068a923219d06
app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;