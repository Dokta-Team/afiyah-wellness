// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const ForumCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this category"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    description: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    threadCount: {
      type: Number,
      default: 0,
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.ForumCategory || mongoose.model("ForumCategory", ForumCategorySchema)
