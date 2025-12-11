import express from "express";
import * as reviewController from "../Weblayer/Controllers/reviewController.js";
import authenticate from "../Weblayer/Middlewares/authenticateToken.js";
const router = express.Router();

router.post("/add", authenticate, reviewController.addReview);
router.patch("/edit/:id", authenticate, reviewController.editReview);
router.delete("/remove/:id", authenticate, reviewController.removeReview);

export default router;