import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
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
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    liveDemo: {
      type: String,
      trim: true,
    },
    githubRepo: {
      type: String,
      trim: true,
    },
    awards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Award",
      },
    ],
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

projectSchema.index({ technologies: 1 });

const Project = mongoose.model("Project", projectSchema);

export default Project;
