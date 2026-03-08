import mongoose from "mongoose";

const projectRequestSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    technologies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technology",
      },
    ],
    budget: {
      type: Number,
      min: 0,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["open", "matched", "in_progress", "completed"],
      default: "open",
    },
    matchedDevelopers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

projectRequestSchema.index({ technologies: 1 });

const ProjectRequest = mongoose.model("ProjectRequest", projectRequestSchema);

export default ProjectRequest;
