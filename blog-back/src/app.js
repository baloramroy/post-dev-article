// -------- src/app.js --------

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import categoryRoutes from './routes/category.routes.js';


dotenv.config();


const app = express();


// CORS configuration to allow cookies from frontend
app.use(cors({
origin: 'http://localhost:5173', // frontend origin
credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});