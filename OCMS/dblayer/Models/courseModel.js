import mongoose from 'mongoose';
import {uploadLogo} from '../../Weblayer/Middlewares/multerMiddleware.js';
import Instructor from './instructorModel.js';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Instructor,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subjects: {
    type: [String],
    default: []
  },
  lessonsCount: {
    type: Number,
    default: 0
  },
  preview: 
    { type: String , ref: uploadLogo , default: ''
  },
  price: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Course', courseSchema);