import * as instructorService from "../../Servicelayer/instructorService.js";
import {sendResetPasswordMail} from '../../utils/emailService.js';
import * as instructorManageer from "../../dblayer/Implementations/instructorManager.js";
import randomstring from "randomstring";
import dotenv from 'dotenv';
dotenv.config();

export const register=async(req,res)=>{
    try{
        const instructor=await instructorService.registerInstructor(req.body);
        res.status(201).json({message:'instructor registered' ,instructor});
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

export const login=async(req,res)=>{
    try{
        const {token , instructor}=await instructorService.loginInstructor(req.body);
        res.status(200).json({token , instructor})
    }catch(err){
        res.status(401).json({error:err.message});
    }
};

export const getInstructor = async (req, res) => {
  try {
    const instructorId = req.params.id;
    console.log(instructorId);
    const instructor = await instructorService.getInstructorProfile(instructorId);
    res.json(instructor);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateInstructor = async (req, res) => {
  try {
    const instructor = await instructorService.updateInstructorProfile(req.params.id, req.body);
    res.json({ message: 'Profile updated', instructor });
  } catch (err) {
    res.status(402).json({ error: err.message });
  }
};

export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await instructorService.getAllInstructors();
    res.status(200).json({
      success: true,
      message: "Instructors retrieved successfully",
      data: instructors,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteInstructor = async (req, res) => {
  try {
    await instructorService.deleteInstructor(req.params.id);
    res.status(200).json({
      success: true,
      message: "Instructor deleted successfully",
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    })
  }
}

export const addInstructor = async (req, res) => {
  try {
    const instructor = await instructorService.addInstructor(req.body);
    res.status(201).json({
      success: true,
      message: "Instructor created successfully",
      data: instructor,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
};

export const getInstructors = async (req, res) => {
  try {
    const { page = 1, limit = 2, specialization } = req.query;

    const result = await instructorService.fetchInstructorsPaginated({
      page: parseInt(page),
      limit: parseInt(limit),
      specialization
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch instructors', error: error.message });
  }
};

export const forgetPassword= async (req,res)=>{
  try{
      const email=req.body.email;
      const instructorData=await instructorManageer.findEmail(email);
      if(instructorData){
        const randomString=randomstring.generate();
        const data=await instructorManageer.setToken(email,randomString);
        sendResetPasswordMail(instructorData.fullName, instructorData.email, randomString);
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
    const tokenData=await instructorManageer.findToken(token);
    if(tokenData){
      const password=req.body.password;
      const newPassword=await bcrypt.hash(password,10);
      const instructorData=await instructorManageer.updateForgetPassword(tokenData,newPassword);
      res.status(200).send({success: true, message:"UserPassword has been reset", data: instructorData});
    } else {
      res.status(200).send({success:true, message:"this link has been expired"});
      }
    } catch (error) {
      res.status(400).send({success: false, message: error});
    }
}