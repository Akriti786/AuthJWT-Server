import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // adjust to your front‑end port

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on :${PORT}`))
);
