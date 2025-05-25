// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this event"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date for this event"],
    },
    endDate: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      required: [true, "Please provide a location for this event"],
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: null,
    },
    capacity: {
      type: Number,
      default: null,
    },
    registrationUrl: {
      type: String,
      default: null,
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

export default mongoose.models.Event || mongoose.model("Event", EventSchema)
