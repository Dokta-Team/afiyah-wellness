// This file is for SERVER COMPONENTS ONLY - all DB operations must be here
import clientPromise from "./mongodb-server"

// Helper function to get database and collection
export async function getCollection(collectionName) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || "afiyah")
  return db.collection(collectionName)
}

// Blog posts
export async function getAllBlogPosts() {
  const collection = await getCollection("blogPosts")
  return collection.find({}).sort({ date: -1 }).toArray()
}

export async function getBlogPostById(id) {
  const collection = await getCollection("blogPosts")
  return collection.findOne({ _id: id })
}

export async function createBlogPost(data) {
  const collection = await getCollection("blogPosts")
  return collection.insertOne(data)
}

export async function updateBlogPost(id, data) {
  const collection = await getCollection("blogPosts")
  return collection.updateOne({ _id: id }, { $set: data })
}

export async function deleteBlogPost(id) {
  const collection = await getCollection("blogPosts")
  return collection.deleteOne({ _id: id })
}

// Programs
export async function getAllPrograms() {
  const collection = await getCollection("programs")
  return collection.find({}).sort({ startDate: 1 }).toArray()
}

export async function getProgramById(id) {
  const collection = await getCollection("programs")
  return collection.findOne({ _id: id })
}

export async function createProgram(data) {
  const collection = await getCollection("programs")
  return collection.insertOne(data)
}

export async function updateProgram(id, data) {
  const collection = await getCollection("programs")
  return collection.updateOne({ _id: id }, { $set: data })
}

export async function deleteProgram(id) {
  const collection = await getCollection("programs")
  return collection.deleteOne({ _id: id })
}

// Events
export async function getAllEvents() {
  const collection = await getCollection("events")
  return collection.find({}).sort({ date: 1 }).toArray()
}

export async function getEventById(id) {
  const collection = await getCollection("events")
  return collection.findOne({ _id: id })
}

export async function createEvent(data) {
  const collection = await getCollection("events")
  return collection.insertOne(data)
}

export async function updateEvent(id, data) {
  const collection = await getCollection("events")
  return collection.updateOne({ _id: id }, { $set: data })
}

export async function deleteEvent(id) {
  const collection = await getCollection("events")
  return collection.deleteOne({ _id: id })
}

// Users/Admins
export async function getUserByEmail(email) {
  const collection = await getCollection("users")
  return collection.findOne({ email })
}

export async function getUserById(id) {
  const collection = await getCollection("users")
  return collection.findOne({ _id: id })
}

export async function createUser(userData) {
  const collection = await getCollection("users")
  return collection.insertOne(userData)
}

export async function updateUser(id, data) {
  const collection = await getCollection("users")
  return collection.updateOne({ _id: id }, { $set: data })
}

// Membership plans
export async function getAllMembershipPlans() {
  const collection = await getCollection("membershipPlans")
  return collection.find({}).sort({ price: 1 }).toArray()
}

export async function getMembershipPlanById(id) {
  const collection = await getCollection("membershipPlans")
  return collection.findOne({ _id: id })
}

// Community Forum
export async function getAllForumCategories() {
  const collection = await getCollection("forumCategories")
  return collection.find({}).sort({ order: 1 }).toArray()
}

export async function getForumCategoryById(id) {
  const collection = await getCollection("forumCategories")
  return collection.findOne({ _id: id })
}

export async function getForumThreadsByCategory(categoryId) {
  const collection = await getCollection("forumThreads")
  return collection.find({ categoryId }).sort({ lastActivityAt: -1 }).toArray()
}

export async function getForumThreadById(id) {
  const collection = await getCollection("forumThreads")
  return collection.findOne({ _id: id })
}

export async function createForumThread(data) {
  const collection = await getCollection("forumThreads")
  return collection.insertOne(data)
}

export async function getForumPostsByThread(threadId) {
  const collection = await getCollection("forumPosts")
  return collection.find({ threadId }).sort({ createdAt: 1 }).toArray()
}

export async function createForumPost(data) {
  const collection = await getCollection("forumPosts")
  const result = await collection.insertOne(data)

  // Update thread's lastActivityAt
  const threadsCollection = await getCollection("forumThreads")
  await threadsCollection.updateOne(
    { _id: data.threadId },
    {
      $set: {
        lastActivityAt: new Date(),
        lastPostBy: data.authorName,
        postCount: { $inc: 1 },
      },
    },
  )

  return result
}

// Member Activities
export async function getMemberActivities(userId, limit = 10) {
  const collection = await getCollection("memberActivities")
  return collection.find({ userId }).sort({ timestamp: -1 }).limit(limit).toArray()
}

export async function createMemberActivity(data) {
  const collection = await getCollection("memberActivities")
  return collection.insertOne({
    ...data,
    timestamp: new Date(),
  })
}

// Member Challenges
export async function getAllChallenges() {
  const collection = await getCollection("challenges")
  return collection.find({}).sort({ startDate: -1 }).toArray()
}

export async function getChallengeById(id) {
  const collection = await getCollection("challenges")
  return collection.findOne({ _id: id })
}

export async function getUserChallenges(userId) {
  const collection = await getCollection("userChallenges")
  return collection.find({ userId }).toArray()
}

export async function joinChallenge(userId, challengeId) {
  const collection = await getCollection("userChallenges")
  return collection.insertOne({
    userId,
    challengeId,
    progress: 0,
    joinedAt: new Date(),
    lastUpdated: new Date(),
    completed: false,
  })
}

export async function updateChallengeProgress(userId, challengeId, progress) {
  const collection = await getCollection("userChallenges")
  return collection.updateOne(
    { userId, challengeId },
    {
      $set: {
        progress,
        lastUpdated: new Date(),
        completed: progress >= 100,
      },
    },
  )
}
