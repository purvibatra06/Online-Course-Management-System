import express from 'express'
import * as lessonsController from '../Weblayer/Controllers/lessonsController.js';
import { uploadVideo } from '../Weblayer/Middlewares/multerMiddleware.js';
import { authorizeRoles } from '../Weblayer/Middlewares/rolebasedAuthorization.js';
import Authenticate from '../Weblayer/Middlewares/authenticateToken.js';

const router=express.Router();
router.post('/create-lesson',Authenticate,authorizeRoles('instructor'),uploadVideo,lessonsController.addLesson);
router.get('/get-allLesson',lessonsController.getAlllessons);
router.delete('/delete-lesson/:id',Authenticate,authorizeRoles('instructor'),lessonsController.deleteLesson);
router.patch('/update-lesson/:id',Authenticate,authorizeRoles('instructor'),uploadVideo,lessonsController.updateLesson);

export default router;