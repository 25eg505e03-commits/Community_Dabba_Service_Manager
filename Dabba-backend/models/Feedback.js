// This file defines how Feedback looks in our database
const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Feedback', feedbackSchema)