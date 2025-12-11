import Review from "../Models/reviewModel.js";

export const createReview = async (reviewData) => {
  const review = new Review(reviewData);
  return await review.save();
}

export const findReviewById = async (id) => {
  return await Review.findById(id);
}

export const findAllReviews = async () => {
  return await Review.find().populate("id", "fullName");
}

export const findReviewByCourse = async (courseId) => {
  return await Review.find({ courseId }).populate("id", "fullName");
}

export const findReviewByLesson = async (lessonId) => {
  return await Review.find({ lessonId }).populate("id", "fullName");
}

export const updateReviewById = async (id, updateData) => {
  return await Review.findByIdAndUpdate(id, updateData, { new: true });
}

export const deleteReviewById = async (id) => {
  return await Review.findByIdAndDelete(id);
}