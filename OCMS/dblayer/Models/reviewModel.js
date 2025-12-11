import mongoose from 'mongoose';
import '../Models/userModel.js';
import '../Models/courseModel.js';
import '../Models/lessonsModel.js';

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
  lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
      },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('reviews', reviewSchema);
export default Review;