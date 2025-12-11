import express from 'express';
import * as userController from '../Weblayer/Controllers/userControllers.js';
import * as courseController from '../Weblayer/Controllers/courseController.js';
import * as lessonsController from '../Weblayer/Controllers/lessonsController.js';
import authenticate from '../Weblayer/Middlewares/authenticateToken.js';
import { authorizeRoles } from '../Weblayer/Middlewares/rolebasedAuthorization.js';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/join-course/:_id',authenticate,authorizeRoles('user'), courseController.enrollInCourse);
router.get('/get-profile', authenticate,authorizeRoles('user'), userController.getProfile);
router.put('/update-profile',authenticate,authorizeRoles('user'), userController.updateProfile);
router.get('/paginatedLesson',authenticate,authorizeRoles('user'),lessonsController.getPaginatedLessons);
router.get('/paginatedCourse',authenticate,authorizeRoles('user'),courseController.getPaginatedCourses);
router.post('/forget-password',userController.forgetPassword);
router.post('/reset-password',userController.resetPassword);

export default router;