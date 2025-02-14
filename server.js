
import express from 'express'
import connectDB from './db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
