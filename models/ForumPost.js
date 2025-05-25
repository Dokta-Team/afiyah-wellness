// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const ForumPostSchema = new mongoose.Schema(
  {
    threadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumThread",
      required: [true, "Please provide a thread for this post"],
    },
    content: {
      type: String,
      required: [true, "Please provide content for this post"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an author for this post"],
    },
    authorName: {
      type: String,
      required: [true, "Please provide an author name for this post"],
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.ForumPost || mongoose.model("ForumPost", ForumPostSchema)
