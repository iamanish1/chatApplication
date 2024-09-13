import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: "string",
      default: "",
    },
    imageUrl: {
      type: "string",
      default: "",
    },
    videoUrl: {
      type: "string",
      default: "",
    },
    seen: {
      type: "boolean",
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields to the schema
  }
);

const ConvoSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields to the schema
  }
);
const messageModel = mongoose.model("Message", messageSchema);
const ConvoModel = mongoose.Model("Convo", ConvoSchema);

export { ConvoModel, messageModel };
