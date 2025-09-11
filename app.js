import express from 'express';
import userRoutes from './routes/User.routes.js';
import bodyParser from "body-parser";
const app = express();
import mailrouter from "./routes/mailrouter.js";
app.use(express.json());
app.use('/', userRoutes);
app.use(bodyParser.json());

app.use("/api", mailrouter);
app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;