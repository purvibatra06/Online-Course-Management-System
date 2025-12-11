import express from "express";
import * as adminController from "../Weblayer/Controllers/adminController.js";
import * as userController from "../Weblayer/Controllers/userControllers.js";
import * as instructorController from "../Weblayer/Controllers/instructorControllers.js";
import authenticate from "../Weblayer/Middlewares/authenticateToken.js";
import * as courseController from "../Weblayer/Controllers/courseController.js";
import * as lessonController from "../Weblayer/Controllers/lessonsController.js";
import { authorizeRoles } from "../Weblayer/Middlewares/rolebasedAuthorization.js";
const router = express.Router();

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.get("/users", authenticate,authorizeRoles('admin'), userController.getAllUsers);
router.post("/addusers",authenticate,authorizeRoles('admin'), userController.addUser);
router.delete("/users/:id",authenticate,authorizeRoles('admin'), userController.deleteUser);
router.get("/instructors",authenticate,authorizeRoles('admin'), instructorController.getAllInstructors);
router.post("/addinstructors",authenticate,authorizeRoles('admin'), instructorController.addInstructor);
router.delete("/instructors/:id",authenticate,authorizeRoles('admin'),  instructorController.deleteInstructor);
router.get("/courses", authenticate,authorizeRoles('admin'), courseController.getAllCourse);
router.get('/getinstructors',authenticate,authorizeRoles('admin'), instructorController.getInstructors);
router.get('/paginatedLesson',authenticate,authorizeRoles('admin'),lessonController.getPaginatedLessons);
router.get('/paginatedCourse',authenticate,authorizeRoles('admin'),courseController.getPaginatedCourses);
router.get('/getusers',authenticate,authorizeRoles('admin'), userController.getUsersWithPagination);
router.post('/sendgmail',authenticate,authorizeRoles('admin'), adminController.sendTestEmail);
router.get('/filtered-course',authenticate,authorizeRoles('admin'),courseController.filterCourses);

export default router;