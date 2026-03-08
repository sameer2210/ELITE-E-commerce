import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    projectRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectRequest",
      required: true,
    },
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    reason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

matchSchema.index({ projectRequestId: 1 });

const Match = mongoose.model("Match", matchSchema);

export default Match;
