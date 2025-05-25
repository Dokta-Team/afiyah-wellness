// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const MemberActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user for this activity"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title for this activity"],
    },
    type: {
      type: String,
      default: "general",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.MemberActivity || mongoose.model("MemberActivity", MemberActivitySchema)
