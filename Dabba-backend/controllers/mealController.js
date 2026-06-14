// This file contains the logic for meals
const Meal = require('../models/Meal')

// GET ALL MEALS
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find()
    res.status(200).json(meals)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// ADD A NEW MEAL
const addMeal = async (req, res) => {
  try {
    const { mealName, description, quantity, location, donorName } = req.body

    // Simple validation
    if (!mealName || !description || !quantity || !location || !donorName) {
      return res.status(400).json({ message: 'Please fill all fields' })
    }

    const newMeal = await Meal.create({
      donor: req.user.id,
      mealName,
      description,
      quantity,
      location,
      donorName: req.user.name
    })

    res.status(201).json({ message: 'Meal added successfully', meal: newMeal })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getMeals, addMeal }
