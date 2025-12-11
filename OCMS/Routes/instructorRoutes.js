import express from'express';
import * as instructorController from '../Weblayer/Controllers/instructorControllers.js';
import authenticate from '../Weblayer/Middlewares/authenticateToken.js';
import { authorizeRoles } from '../Weblayer/Middlewares/rolebasedAuthorization.js';

const router=express.Router();

router.post('/register',instructorController.register);
router.post('/login',instructorController.login);
router.get('/getprofile/:id',authenticate,authorizeRoles('instructor'), instructorController.getInstructor);
router.put('/Profile/:id',authenticate,authorizeRoles('instructor') , instructorController.updateInstructor);
router.post('/forget-password',instructorController.forgetPassword);
router.post('/reset-password',instructorController.resetPassword);

export default router;