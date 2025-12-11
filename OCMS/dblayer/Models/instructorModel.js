import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const qualificationSchema = new mongoose.Schema({
  degree: { type: String },
  institution: { type: String },
  year: { type: Number }
});

const instructorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: { type: String, required: true },
  bio: {
    type: String,
    required: true
  },
  qualifications: [qualificationSchema],
  specialization: [String],
  profilePicture: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'instructor',
    enum: ['user', 'instructor', 'admin']
  }
});

instructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

instructorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Instructor = mongoose.model('Instructor', instructorSchema);
export default Instructor;