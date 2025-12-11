import bcrypt from 'bcryptjs';
import Instructor from '../../dblayer/Models/instructorModel.js';

export const createInstructor = async (instructorData) => {
  const instructor = new Instructor(instructorData);
  return await instructor.save();
};

export const findInstructorByEmail = async (email) => {
  return await Instructor.findOne({ email });
};

export const comparePasswordByEmail = async (email, password) => {
  const instructor = await Instructor.findOne({ email });
  if (!instructor) return null;
  const isMatch = await bcrypt.compare(password, instructor.password);
  return isMatch ? instructor : null;
};

export const getInstructorById = async (_id) => {
  return await Instructor.findById(_id); 
};

export const updateInstructorById = async (_id, updateData) => {
  return await Instructor.findByIdAndUpdate(_id, updateData, { new: true });
};

export const findAllInstructor = async () => {
  return await Instructor.find();
};

export const deleteInstructorById = async (id) => {
  return await Instructor.findByIdAndDelete(id);
};

export const getInstructorsPaginated = async (page = 1, limit = 10, specialization) => {
  const filter = {};
  if (specialization) {
    filter.specialization = { $in: [specialization] };
  }
  const total = await Instructor.countDocuments(filter);
  const instructors = await Instructor.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 }); 
  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    instructors
  };
};

export const findEmail= async (email)=>{
  return await Instructor.findOne({email: email});
}

export const setToken=async(email,randomString)=>{
  return await Instructor.updateOne({email: email},{$set: {token: randomString}});
}

export const findToken= async (token)=>{
  return await Instructor.findOne({token: token});
}

export const updateForgetPassword=async(tokenData,newPassword)=>{
  return await Instructor.findByIdAndUpdate({_id:tokenData._id},{$set:{password: newPassword, token: ''}},{new: true})
}