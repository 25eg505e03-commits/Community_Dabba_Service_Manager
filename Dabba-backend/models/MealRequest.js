const mongoose = require('mongoose')

const mealRequestSchema = new mongoose.Schema(
  {
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal',
      required: true
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending'
    }
  },
  { timestamps: true }
)

mealRequestSchema.index({ meal: 1, receiver: 1 }, { unique: true })

module.exports = mongoose.model('MealRequest', mealRequestSchema)
