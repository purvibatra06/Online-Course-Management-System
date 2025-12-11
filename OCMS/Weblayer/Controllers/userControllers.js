import * as userService from "../../Servicelayer/userService.js";
import randomstring from 'randomstring';
import { configDotenv } from 'dotenv';
import * as userManager from "../../dblayer/Implementations/userManager.js";
import { sendResetPasswordMail } from '../../utils/emailService.js';
import bcrypt from 'bcryptjs';
configDotenv();

export const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await userService.loginUser(req.body);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUserProfile(req.user.id, req.body);
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    })
  }
};

export const addUser = async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
};

export const getUsersWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = {
      role: req.query.role,
      fullName: req.query.fullName,
      email: req.query.email
    };
    const result = await userService.fetchPaginatedUsers(page, limit, filters);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

export const forgetPassword= async (req,res)=>{
  try{
      const email=req.body.email;
      const userData=await userManager.findEmail(email);
      if(userData){
        const randomString=randomstring.generate();
        const data=await userManager.setToken(email,randomString);
        sendResetPasswordMail(userData.fullName, userData.email, randomString);
        res.status(200).send({success: true, message:"please check your inbox of your mail and reset your password" });
        } else {
          res.status(200).send({success: true, message: "this email does not exist"})
         }
      }catch(error){
        res.status(400).send({success: false,
        message: error
        })
      }
}

export const resetPassword= async (req,res)=>{
  try {
    const token=req.query.token;
    const tokenData=await userManager.findToken(token);
    if(tokenData){
      const password=req.body.password;
      const newPassword=await bcrypt.hash(password,10);
      const userData=await userManager.updateForgetPassword(tokenData,newPassword);
      res.status(200).send({success: true, message:"UserPassword has been reset", data: userData});
    } else {
      res.status(200).send({success:true, message:"this link has been expired"});
      }
    } catch (error) {
      res.status(400).send({success: false, message: error});
    }
}