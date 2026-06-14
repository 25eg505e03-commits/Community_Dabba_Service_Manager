// This file contains the logic for subscriptions
const Subscription = require('../models/Subscription')

// ADD A NEW SUBSCRIPTION
const addSubscription = async (req, res) => {
  try {
    const { name, email, area } = req.body

    // Simple validation
    if (!name || !email || !area) {
      return res.status(400).json({ message: 'Please fill all fields' })
    }

    const newSubscription = await Subscription.create({
      name,
      email,
      area
    })

    res.status(201).json({ message: 'Subscribed successfully', subscription: newSubscription })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET ALL SUBSCRIPTIONS
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
    res.status(200).json(subscriptions)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { addSubscription, getSubscriptions }