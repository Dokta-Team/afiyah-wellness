// This file is for SERVER COMPONENTS ONLY
import mongoose from "mongoose"

const UserChallengeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user for this challenge"],
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: [true, "Please provide a challenge"],
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.UserChallenge || mongoose.model("UserChallenge", UserChallengeSchema)
