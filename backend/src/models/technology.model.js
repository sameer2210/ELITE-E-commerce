import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Technology = mongoose.model("Technology", technologySchema);

export default Technology;
