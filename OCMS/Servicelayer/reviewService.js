import * as reviewManager from "../dblayer/Implementations/reviewManager.js";

export const createReview = async (reviewData) => {
  if (!reviewData.comment || !reviewData.id) {
    throw new Error("Comment and user ID are required");
  }
  if (reviewData.comment.trim().length < 5) {
    throw new Error("Comment must be at least 5 characters long");
  }
  return await reviewManager.createReview(reviewData);
}

export const updateReview = async (id, updateData) => {
  if (!id) {
    throw new Error("Review ID is required");
  }
  const existingReview = await reviewManager.findReviewById(id);
  if (!existingReview) {
    throw new Error("Review not found");
  }
  if (updateData.comment && updateData.comment.trim().length < 5) {
    throw new Error("Comment must be at least 5 characters long");
  }
  return await reviewManager.updateReviewById(id, {
    ...updateData,
    updatedAt: new Date(),
  })
}

export const deleteReview = async (id) => {
  if (!id) {
    throw new Error("Review ID is required");
  }
  const review = await reviewManager.findReviewById(id);
  if (!review) {
    throw new Error("Review not found");
  }
  return await reviewManager.deleteReviewById(id);
}