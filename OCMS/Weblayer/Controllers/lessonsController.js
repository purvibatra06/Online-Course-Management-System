import * as lessonService from "../../Servicelayer/lessonsService.js";

export const addLesson = async (req, res) => {
  try {
    const {...lessonData} = req.body;
    if(req?.file)
    {
        lessonData.video=req.file.path;
    }
    const { vname, courseId, duration, description } = lessonData;
    if (!vname || !courseId || !duration || !description) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided.',
      });
    }
    const lesson = await lessonService.postLesson(lessonData);
    res.status(201).json({
      success: true,
      message: 'Lesson added successfully.',
      data: lesson,
    });
  } catch (error) {
    console.error('Error adding lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding lesson.',
      error: error.message,
    });
  }
};

export const getAlllessons= async (req, res) => {
  try {
    const lessons = await lessonService.getLessons();
    res.status(200).json({
      message: 'All lessons are fetched successfully',
      lessons
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const deleteLesson= async(req, res)=>{
    try{
        const {id}=req.params;
        const pop=await lessonService.lessonDelete(id);
       if(pop!==null){
             res.status(200).send({
            success: true,
            message: 'lesson deleted successfully',
            pop
        })
       }
       else{
        res.status(200).send({
          success: true,
          message: 'lesson does not exist'
        })
       }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error during deleting lesson'
        })
    }
}

export const updateLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const updates = req.body;
      if(req?.file)
    {
        updates.video=req.file.path;
    }
    const updatedlesson= await lessonService.updatesLesson(lessonId,updates);
    if (!updatedlesson) {
      return res.status(404).json({ success: false, message: 'lesson not found' });
    }
    res.status(200).json({
      success: true,
      message: 'lesson updated successfully',
      data: updatedlesson
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lesson',
      error: error.message
    });
  }
};

export const getPaginatedLessons = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const lessons = await lessonService.paginatedLessons(page, limit );
  res.status(200).json(lessons);
};