import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import adminRoutes from '../OCMS/Routes/adminRoutes.js';
import reviewRoutes from '../OCMS/Routes/reviewRoutes.js';
import connectDB from '../OCMS/dblayer/Implementations/dbConnect.js';
import courseRoutes from './Routes/courseRoute.js';
import lessonRoutes from './Routes/lessonsRoute.js';
import UserRoutes from './Routes/userRoutes.js';
import instructorRoutes from './Routes/instructorRoutes.js';

const app=express();
configDotenv();
mongoose.set('strictQuery', true);
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/user',UserRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/course',courseRoutes);
app.use('/api/lesson',lessonRoutes);
app.use('/api/review', reviewRoutes);

Promise.all([connectDB()]).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});