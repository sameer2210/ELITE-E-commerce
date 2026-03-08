import mongoose from "mongoose";

const awardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "SiteOfTheDay",
        "ProjectOfTheWeek",
        "InnovationAward",
        "CommunityChoice",
      ],
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Award = mongoose.model("Award", awardSchema);

export default Award;
