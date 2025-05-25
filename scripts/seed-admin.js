// This script creates an admin user in the database
// Run with: node scripts/seed-admin.js

require("dotenv").config()
const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "afiyah"

if (!uri) {
  console.error("Please set MONGODB_URI in .env file")
  process.exit(1)
}

async function seedAdmin() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)
    const usersCollection = db.collection("users")

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@afiyah.com" })

    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12)

    const adminUser = {
      name: "Admin User",
      email: "admin@afiyah.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    }

    await usersCollection.insertOne(adminUser)
    console.log("Admin user created successfully")
    console.log("Email: admin@afiyah.com")
    console.log("Password: admin123")
    console.log("Please change this password after first login")
  } catch (error) {
    console.error("Error seeding admin user:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

seedAdmin()
