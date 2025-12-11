import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import * as userManager from "../dblayer/Implementations/userManager.js";
const secret = process.env.SECRET;

export const registerUser = async (userData) => {
  return await userManager.createUser(userData);
};

export const loginUser = async ({ email, password }) => {
  const user = await userManager.findUserByEmail(email);
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  const payload = {
  id: user._id,
  role: 'user',
  exp: Math.floor(Date.now() / 1000) + 3600
  };
  const token = jwt.encode(payload, secret);
  return { token, user };
};

export const getUserProfile = async (id) => {
  return await userManager.getUserProfileById(id);
};

export const updateUserProfile = async (id, updateData) => {
  return await userManager.updateUserById(id, updateData);
};
export const getAllUsers = async () => {
  return await userManager.findAllUser();
};

export const deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }
  const user = await userManager.findUserById(id)
  if (!user) {
    throw new Error("User not found");
  }
  return await userManager.deleteUserById(id);
};

export const addUser = async (userData) => {
  const { email, password} = userData;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const existingUser = await userManager.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userManager.createUser({ ...userData, password: hashedPassword });
};

export const fetchPaginatedUsers = async (page, limit, filters) => {
  return await userManager.getPaginatedUsers(page, limit, filters);
};