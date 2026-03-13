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
    image: {
      type: String,
      trim: true,
    },
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

projectSchema.pre("validate", function (next) {
  const imagesModified = this.isModified("images");
  const imageModified = this.isModified("image");

  if (imagesModified) {
    if (Array.isArray(this.images) && this.images.length) {
      this.image = this.images[0];
    } else {
      this.image = undefined;
    }
  } else if (imageModified) {
    if (this.image) {
      this.images = [this.image];
    } else {
      this.images = [];
    }
  }

  next();
});

projectSchema.virtual("id").get(function () {
  return this._id.toString();
});

projectSchema.set("toJSON", { virtuals: true, versionKey: false });
projectSchema.set("toObject", { virtuals: true, versionKey: false });

const Project = mongoose.model("Project", projectSchema);

export default Project;
