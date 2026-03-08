import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    companySize: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const ClientProfile = mongoose.model("ClientProfile", clientProfileSchema);

export default ClientProfile;
