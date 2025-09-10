import app from './app.js';
import connectDB from './db/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
