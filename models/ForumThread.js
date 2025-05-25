// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const ForumThreadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this thread"],
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumCategory",
      required: [true, "Please provide a category for this thread"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an author for this thread"],
    },
    authorName: {
      type: String,
      required: [true, "Please provide an author name for this thread"],
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
    lastPostBy: {
      type: String,
      default: "",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.ForumThread || mongoose.model("ForumThread", ForumThreadSchema)
