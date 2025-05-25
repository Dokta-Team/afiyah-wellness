// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

// Define schema only if it doesn't exist yet
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this post"],
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content for this post"],
    },
    excerpt: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Use existing model or create a new one
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)
