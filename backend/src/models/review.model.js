import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectRequest",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ developerId: 1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
