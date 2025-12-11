import * as courseManager from "../dblayer/Implementations/courseManager.js";
import * as userManager from "../dblayer/Implementations/userManager.js";

export const registerCourse = async (courseData) => {
  return await courseManager.saveCourse(courseData);  
};

export const getCourses= async ()=>{
  return await courseManager.giveCourses();
}

export const getCourseById= async (id)=>{
  return await courseManager.getOneCourse(id);
}

export const deleteFromId= async (id)=>{
  return await courseManager.deleteById(id);
}

export const joinCourse = async (id, courseId) => {
  const user = await userManager.findUserById(id);
  const course = await courseManager.findCourseById(courseId);
  if (!user || !course) throw new Error('User or course not found');
  const alreadyJoined = await courseManager.checkIfCourseJoined(id, courseId);
  if (!alreadyJoined) {
    await userManager.joinUserToCourse(id, courseId);
  }
  return {
    message: 'Course joined successfully',
    courses: user.coursesjoin
  };
};

export const getAllCourses = async () => {
  return await courseManager.findAllCourse();
}

export const paginatedCourses = async (page, limit ) => {
  const skip = (page - 1) * limit;
  return await courseManager.findCourses(limit,skip);
};

export const getfilteredCourses = async ({ page, limit, lessonsCount, price }) => {
  const skip = (page - 1) * limit;
  const filter = {};
  if (price !== undefined) {
    filter.price = price;
  }
  if (lessonsCount !== undefined) {
    filter.lessonsCount = lessonsCount;
  }
  return await courseManager.findFilteredCourses(filter,skip,limit);
};