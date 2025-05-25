// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const ProgramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this program"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this program"],
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    details: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: "General",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Program || mongoose.model("Program", ProgramSchema)
