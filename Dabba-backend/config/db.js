// This file connects our backend to MongoDB using Mongoose
const mongoose = require('mongoose')

// This function connects to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.log('MongoDB connection failed:', error.message)
    // Stop the server if database connection fails
    process.exit(1)
  }
}

module.exports = connectDB