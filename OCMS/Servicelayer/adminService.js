import * as adminManager from "../dblayer/Implementations/adminManager.js";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;

export const registerAdmin = async (adminData) => {
  const { email, password } = adminData;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const existingAdmin = await adminManager.findAdminByEmail(email);
  if (existingAdmin) {
    throw new Error("Admin already exists with this email");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const admin = await adminManager.createAdmin({ email, password: hashedPassword });
  return { id: admin._id, email: admin.email };
}

export const loginAdmin = async (loginData) => {
  const { email, password } = loginData;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const admin = await adminManager.findAdminByEmail(email);
  if (!admin) {
    throw new Error("Invalid credentials");
  }
  const isValidPassword = await bcrypt.compare(password, admin.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.encode(
  {
    id: admin._id,
    email: admin.email,
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + 3600,
  },
  secret,
)
return { token, admin: { id: admin._id, email: admin.email } };
}