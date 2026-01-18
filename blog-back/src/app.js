// -------- src/app.js --------

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//1st phase
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

//2nd phase
import postRoutes from './routes/post.routes.js';
import categoryRoutes from './routes/category.routes.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


// Routes

//1st phase
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//2nd phase
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);


// DB Connection
//1st phase
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));