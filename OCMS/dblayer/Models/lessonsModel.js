import mongoose from 'mongoose';
import { uploadVideo } from '../../Weblayer/Middlewares/multerMiddleware.js';

const lessonSchema = new mongoose.Schema(
  {
    vname: {
      type: String,
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: 
      { type: String , ref: uploadVideo , default: ''
  }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false }, // only track creation time
  }
);

export default mongoose.model('Lesson', lessonSchema);