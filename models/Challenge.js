// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const ChallengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this challenge"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this challenge"],
    },
    category: {
      type: String,
      default: "General",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    participantCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema)
