// This file is for SERVER COMPONENTS ONLY
import dbConnect from "./mongoose"
import Blog from "../models/Blog"
import Program from "../models/Program"
import Event from "../models/Event"
import User from "../models/User"
import ForumCategory from "../models/ForumCategory"
import ForumThread from "../models/ForumThread"
import ForumPost from "../models/ForumPost"
import Challenge from "../models/Challenge"
import UserChallenge from "../models/UserChallenge"
import MemberActivity from "../models/MemberActivity"
import mongoose from "mongoose"

// Helper to convert Mongoose _id to string id
function convertDocToObj(doc) {
  const obj = doc.toObject ? doc.toObject() : doc
  obj._id = obj._id.toString()
  return obj
}

// Blog posts
export async function getAllBlogPosts() {
  await dbConnect()
  const posts = await Blog.find({}).sort({ date: -1 }).lean()
  return posts.map((post) => {
    post._id = post._id.toString()
    return post
  })
}

export async function getBlogPostById(id) {
  await dbConnect()
  const post = await Blog.findById(id).lean()
  if (!post) return null
  post._id = post._id.toString()
  return post
}

export async function createBlogPost(data) {
  await dbConnect()
  const post = new Blog(data)
  await post.save()
  return convertDocToObj(post)
}

export async function updateBlogPost(id, data) {
  await dbConnect()
  const post = await Blog.findByIdAndUpdate(id, data, { new: true }).lean()
  if (!post) return null
  post._id = post._id.toString()
  return post
}

export async function deleteBlogPost(id) {
  await dbConnect()
  await Blog.findByIdAndDelete(id)
  return { success: true }
}

// Programs
export async function getAllPrograms() {
  await dbConnect()
  const programs = await Program.find({}).sort({ startDate: 1 }).lean()
  return programs.map((program) => {
    program._id = program._id.toString()
    return program
  })
}

export async function getProgramById(id) {
  await dbConnect()
  const program = await Program.findById(id).lean()
  if (!program) return null
  program._id = program._id.toString()
  return program
}

export async function createProgram(data) {
  await dbConnect()
  const program = new Program(data)
  await program.save()
  return convertDocToObj(program)
}

export async function updateProgram(id, data) {
  await dbConnect()
  const program = await Program.findByIdAndUpdate(id, data, { new: true }).lean()
  if (!program) return null
  program._id = program._id.toString()
  return program
}

export async function deleteProgram(id) {
  await dbConnect()
  await Program.findByIdAndDelete(id)
  return { success: true }
}

// Events
export async function getAllEvents() {
  await dbConnect()
  const events = await Event.find({}).sort({ date: 1 }).lean()
  return events.map((event) => {
    event._id = event._id.toString()
    return event
  })
}

export async function getEventById(id) {
  await dbConnect()
  const event = await Event.findById(id).lean()
  if (!event) return null
  event._id = event._id.toString()
  return event
}

export async function createEvent(data) {
  await dbConnect()
  const event = new Event(data)
  await event.save()
  return convertDocToObj(event)
}

export async function updateEvent(id, data) {
  await dbConnect()
  const event = await Event.findByIdAndUpdate(id, data, { new: true }).lean()
  if (!event) return null
  event._id = event._id.toString()
  return event
}

export async function deleteEvent(id) {
  await dbConnect()
  await Event.findByIdAndDelete(id)
  return { success: true }
}

// Users/Admins
export async function getUserByEmail(email) {
  await dbConnect()
  const user = await User.findOne({ email }).lean()
  if (!user) return null
  user._id = user._id.toString()
  return user
}

export async function getUserById(id) {
  await dbConnect()
  const user = await User.findById(id).lean()
  if (!user) return null
  user._id = user._id.toString()
  return user
}

export async function createUser(userData) {
  await dbConnect()
  const user = new User(userData)
  await user.save()
  return convertDocToObj(user)
}

export async function updateUser(id, data) {
  await dbConnect()
  const user = await User.findByIdAndUpdate(id, data, { new: true }).lean()
  if (!user) return null
  user._id = user._id.toString()
  return user
}

// Forum Categories
export async function getAllForumCategories() {
  await dbConnect()
  const categories = await ForumCategory.find({}).sort({ order: 1 }).lean()
  return categories.map((category) => {
    category._id = category._id.toString()
    return category
  })
}

export async function getForumCategoryById(id) {
  await dbConnect()
  const category = await ForumCategory.findById(id).lean()
  if (!category) return null
  category._id = category._id.toString()
  return category
}

// Forum Threads
export async function getForumThreadsByCategory(categoryId) {
  await dbConnect()
  const threads = await ForumThread.find({ categoryId }).sort({ lastActivityAt: -1 }).lean()
  return threads.map((thread) => {
    thread._id = thread._id.toString()
    thread.categoryId = thread.categoryId.toString()
    return thread
  })
}

export async function getForumThreadById(id) {
  await dbConnect()
  const thread = await ForumThread.findById(id).lean()
  if (!thread) return null
  thread._id = thread._id.toString()
  thread.categoryId = thread.categoryId.toString()
  return thread
}

export async function createForumThread(data) {
  await dbConnect()
  const thread = new ForumThread({
    ...data,
    categoryId: new mongoose.Types.ObjectId(data.categoryId),
    authorId: new mongoose.Types.ObjectId(data.authorId),
  })
  await thread.save()

  // Update category thread and post count
  await ForumCategory.findByIdAndUpdate(data.categoryId, {
    $inc: { threadCount: 1, postCount: 1 },
  })

  return convertDocToObj(thread)
}

// Forum Posts
export async function getForumPostsByThread(threadId) {
  await dbConnect()
  const posts = await ForumPost.find({ threadId }).sort({ createdAt: 1 }).lean()
  return posts.map((post) => {
    post._id = post._id.toString()
    post.threadId = post.threadId.toString()
    post.authorId = post.authorId.toString()
    return post
  })
}

export async function createForumPost(data) {
  await dbConnect()
  const post = new ForumPost({
    ...data,
    threadId: new mongoose.Types.ObjectId(data.threadId),
    authorId: new mongoose.Types.ObjectId(data.authorId),
  })
  await post.save()

  // Update thread's lastActivityAt and post count
  await ForumThread.findByIdAndUpdate(data.threadId, {
    lastActivityAt: new Date(),
    lastPostBy: data.authorName,
    $inc: { postCount: 1 },
  })

  // Update category post count
  const thread = await ForumThread.findById(data.threadId).lean()
  if (thread) {
    await ForumCategory.findByIdAndUpdate(thread.categoryId, {
      $inc: { postCount: 1 },
    })
  }

  return convertDocToObj(post)
}

// Challenges
export async function getAllChallenges() {
  await dbConnect()
  const challenges = await Challenge.find({}).sort({ startDate: -1 }).lean()
  return challenges.map((challenge) => {
    challenge._id = challenge._id.toString()
    return challenge
  })
}

export async function getChallengeById(id) {
  await dbConnect()
  const challenge = await Challenge.findById(id).lean()
  if (!challenge) return null
  challenge._id = challenge._id.toString()
  return challenge
}

// User Challenges
export async function getUserChallenges(userId) {
  await dbConnect()
  const userChallenges = await UserChallenge.find({ userId }).lean()
  return userChallenges.map((uc) => {
    uc._id = uc._id.toString()
    uc.userId = uc.userId.toString()
    uc.challengeId = uc.challengeId.toString()
    return uc
  })
}

export async function joinChallenge(userId, challengeId) {
  await dbConnect()
  const userChallenge = new UserChallenge({
    userId: new mongoose.Types.ObjectId(userId),
    challengeId: new mongoose.Types.ObjectId(challengeId),
    progress: 0,
    joinedAt: new Date(),
    lastUpdated: new Date(),
    completed: false,
  })
  await userChallenge.save()

  // Update challenge participant count
  await Challenge.findByIdAndUpdate(challengeId, {
    $inc: { participantCount: 1 },
  })

  return convertDocToObj(userChallenge)
}

export async function updateChallengeProgress(userId, challengeId, progress) {
  await dbConnect()
  const completed = progress >= 100
  const userChallenge = await UserChallenge.findOneAndUpdate(
    { userId, challengeId },
    {
      progress,
      lastUpdated: new Date(),
      completed,
    },
    { new: true },
  ).lean()

  if (!userChallenge) return null
  userChallenge._id = userChallenge._id.toString()
  userChallenge.userId = userChallenge.userId.toString()
  userChallenge.challengeId = userChallenge.challengeId.toString()
  return userChallenge
}

// Member Activities
export async function getMemberActivities(userId, limit = 10) {
  await dbConnect()
  const activities = await MemberActivity.find({ userId }).sort({ timestamp: -1 }).limit(limit).lean()

  return activities.map((activity) => {
    activity._id = activity._id.toString()
    activity.userId = activity.userId.toString()
    return activity
  })
}

export async function createMemberActivity(data) {
  await dbConnect()
  const activity = new MemberActivity({
    ...data,
    userId: new mongoose.Types.ObjectId(data.userId),
    timestamp: new Date(),
  })
  await activity.save()
  return convertDocToObj(activity)
}
