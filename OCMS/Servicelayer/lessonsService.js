import * as lessonManager from "../dblayer/Implementations/lessonsManager.js";

export const postLesson = async (lessonData) => {
  return await lessonManager.postsLesson(lessonData);
}

export const getLessons= async ()=>{
  return await lessonManager.getsLessons();
}

export const lessonDelete= async (id)=>{
    return await lessonManager.deleteLessonById(id);
}

export const updatesLesson= async (lessonId,updates)=>{
  return await lessonManager.lessonChange(lessonId,updates);
}

export const paginatedLessons = async (page, limit ) => {
  const skip = (page - 1) * limit;
   return await lessonManager.findLessons(limit,skip);
};