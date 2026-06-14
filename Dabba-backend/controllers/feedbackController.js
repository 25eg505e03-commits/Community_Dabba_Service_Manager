// This file contains the logic for feedback
const Feedback = require('../models/Feedback')

// ADD NEW FEEDBACK
const addFeedback = async (req, res) => {
  try {
    const { name, rating, message } = req.body

    // Simple validation
    if (!name || !rating || !message) {
      return res.status(400).json({ message: 'Please fill all fields' })
    }

    const newFeedback = await Feedback.create({
      name,
      rating,
      message
    })

    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET ALL FEEDBACK
const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    res.status(200).json(feedbacks)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { addFeedback, getFeedback }