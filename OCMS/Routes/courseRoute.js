import express from 'express'
import * as courseController from '../Weblayer/Controllers/courseController.js';
import {uploadLogo} from '../Weblayer/Middlewares/multerMiddleware.js';
import { authorizeRoles } from '../Weblayer/Middlewares/rolebasedAuthorization.js';
import authenticate from '../Weblayer/Middlewares/authenticateToken.js';
const router=express.Router();

router.post('/register-course',authenticate,authorizeRoles('instructor'),uploadLogo,courseController.createCourse);
router.get('/get-courses',courseController.getAllCourses);
router.get('/get-course/:id',courseController.getSingleCourse);
router.delete('/delete/:id',authenticate,authorizeRoles('instructor'),courseController.deleteCourse);
router.patch('/update/:id',authenticate,authorizeRoles('instructor'),uploadLogo,courseController.updateCourse);

export default router;