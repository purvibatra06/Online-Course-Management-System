import Lessons from '../Models/lessonsModel.js'

export const postsLesson= async (lessonData)=>{
    return Lessons.create(lessonData);
}

export const getsLessons= async ()=>{
    return await Lessons.find({});
}

export const deleteLessonById= async (id)=>{
    return await Lessons.findByIdAndDelete(id);
}

export const lessonChange= async (lessonId,updates)=>{
   return await Lessons.findByIdAndUpdate(lessonId, updates, {
      new: true, 
      runValidators: true,
     });
}

export const findLessons= async(limit,skip)=>{
  const lessons= await Lessons.find().skip(skip).limit(limit)
  return lessons;
}