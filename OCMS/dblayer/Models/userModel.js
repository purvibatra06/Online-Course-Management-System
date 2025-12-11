import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const qualificationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: Number
});

const courseJoinSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  status: {
    type: String,
    enum: ['enrolled', 'completed'],
    default: 'enrolled'
  },
  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate',
    default: null
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  bio: String,
  qualifications: [qualificationSchema],
  profilePicture: String,
  coursesjoin: [courseJoinSchema],
   token: {
    type: String,
    default: ''
  },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: 'user', enum: ['user', 'instructor', 'admin'] }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;