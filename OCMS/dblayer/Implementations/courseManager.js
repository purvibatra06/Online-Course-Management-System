import Course from '../Models/courseModel.js';
import User from '../Models/userModel.js';

export const saveCourse= async (data) => {
  const result = new Course(data);
  return await result.save();
};

export const giveCourses= async ()=>{
  return await Course.find({})
}

export const getOneCourse= async (id)=>{
  return await Course.findById(id);
}

export const deleteById= async (id)=>{
  return await Course.findByIdAndDelete(id);
}

export const checkIfCourseJoined = async (id, courseId) => {
  const user = await User.findById(id).populate("coursesjoin");
  if (!user) return false;
  return user.coursesjoin.some(c => c.course.toString() === courseId);
};

export const findCourseById = async (courseId) => {
  return await Course.findById(courseId);
};

export const findAllCourse = async () => {
  return await Course.find();
}

export const findCourses= async(limit,skip)=>{
  const courses= await Course.find().skip(skip).limit(limit)
  return courses;
}

export const findFilteredCourses= async (filter,skip,limit)=>{
  const courses = await Course.find(filter).skip(skip).limit(limit);
  return courses;
}

export const courseUpdate= async (courseId,updates)=>{
    return await Course.findByIdAndUpdate(courseId, updates, {   new: true,   runValidators: true})
}