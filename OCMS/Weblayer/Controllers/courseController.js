import * as courseService from "../../Servicelayer/courseService.js";
import * as courseManager from "../../dblayer/Implementations/courseManager.js";

export const createCourse=async (req, res) => {
  try {
    const {...courseData}= req.body;
    if(courseData.subjects) courseData.subjects=JSON.parse(courseData.subjects);
    if(req?.file)
    {
        courseData.preview=req.file.path;
    }
      courseData.createdBy = req.user.id;
    const data=await courseService.registerCourse(courseData);
    res.status(201).json({ success: true, course: data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating course', error: err });
  }
}

export const getAllCourses= async (req, res) => {
  try {
    const courses = await courseService.getCourses();
    res.status(200).json({
      message: 'All courses are fetched successfully',
      courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSingleCourse= async (req , res) => {
  try {
    const {id} = req.params;
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({ message: 'course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCourse= async (req,res)=>{
  try{
       const {id}=req.params;
     const result = await courseService.deleteFromId(id);
     if(!result)
     {
       return res.status(404).json({ message: 'course not found' });
     }
     res.status(200).json({success: true,
      message: "Course deleted successfully"
     });
  }catch(error){
      console.error('Error in deleting course:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updates = req.body;
     if(req?.file)
    {
        updates.preview=req.file.path;
    }
    const updatedCourse= await courseManager.courseUpdate(courseId,updates);
    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: 'course not found' });
    }
    res.status(200).json({
      success: true,
      message: 'course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    console.error('Error updating Course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update Course',
      error: error.message
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params._id;
    const id = req.user.id;
    console.log("Token decoded req.user:", req.user);
console.log("Extracted id:", req.user.id);
    const result = await courseService.joinCourse(id, courseId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getPaginatedCourses = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const courses = await courseService.paginatedCourses(page, limit );
  res.status(200).json(courses);
};

export const filterCourses = async (req, res) => {
  const { page = 1, limit = 1, lessonsCount,price } = req.body;
  const result = await courseService.getfilteredCourses({
    page: parseInt(page),
    limit: parseInt(limit),
    lessonsCount,
    price
  });
  res.status(200).json(result);
};