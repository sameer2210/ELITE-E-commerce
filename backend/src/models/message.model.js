import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectRequest",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
