import * as reviewService from "../../Servicelayer/reviewService.js";

export const addReview = async (req, res) => {
  try {
    const reviewData = { ...req.body, id: req.user.id };
    const review = await reviewService.createReview(reviewData);
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const editReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const removeReview = async (req, res) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    })
  }
}