import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import { configDotenv } from 'dotenv';
configDotenv();
import dotenv from 'dotenv';
import * as instructorManager from "../dblayer/Implementations/instructorManager.js";
dotenv.config();
const secret = process.env.SECRET;

export const registerInstructor = async (instructorData) => {
  return await instructorManager.createInstructor(instructorData);
};

export const loginInstructor = async ({ email, password }) => {
  const instructor = await instructorManager.comparePasswordByEmail(email, password);
  if (!instructor) throw new Error('Invalid credentials');
  const token = jwt.encode({ id: instructor._id, role: 'instructor', exp: Math.floor(Date.now() / 1000) + 3600 }, secret);
  return { token, instructor };
};

export const getInstructorProfile = async (_id) => {
  return await instructorManager.getInstructorById(_id);
};

export const updateInstructorProfile = async (instructorId, updateData) => {
  return await instructorManager.updateInstructorById(instructorId, updateData);
};

export const getAllInstructors = async () => {
  return await instructorManager.findAllInstructor();
};

export const deleteInstructor = async (id) => {
  if (!id) {
    throw new Error("Instructor ID is required");
  }
  const instructor = await instructorManager.getInstructorById(id);
  if (!instructor) {
    throw new Error("Instructor not found");
  }
  return await instructorManager.deleteInstructorById(id);
};

export const addInstructor = async (instructorData) => {
  const { email, password} = instructorData;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const existingInstructor = await instructorManager.findInstructorByEmail(email);
  if (existingInstructor) {
    throw new Error("Instructor already exists with this email");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await instructorManager.createInstructor({ ...instructorData, password: hashedPassword });
};

export const fetchInstructorsPaginated = async ({ page, limit, specialization }) => {
  return await instructorManager.getInstructorsPaginated(page, limit, specialization);
};