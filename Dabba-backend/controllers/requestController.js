const Meal = require('../models/Meal')
const MealRequest = require('../models/MealRequest')

const contactFields = 'name email phone'

const populateRequest = (query) =>
  query
    .populate('meal', 'mealName location quantity')
    .populate('donor', contactFields)
    .populate('receiver', contactFields)

const hidePrivateContact = (request, currentUserId) => {
  const data = request.toObject()

  if (data.status !== 'Accepted') {
    if (data.donor && data.donor._id.toString() !== currentUserId) {
      delete data.donor.email
      delete data.donor.phone
    }

    if (data.receiver && data.receiver._id.toString() !== currentUserId) {
      delete data.receiver.email
      delete data.receiver.phone
    }
  }

  return data
}

const createRequest = async (req, res) => {
  try {
    if (req.user.role !== 'receiver') {
      return res.status(403).json({ message: 'Only receivers can request meals' })
    }

    const meal = await Meal.findById(req.params.mealId)

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' })
    }

    if (meal.quantity < 1) {
      return res.status(400).json({ message: 'This meal is no longer available' })
    }

    if (!meal.donor) {
      return res.status(400).json({
        message: 'This older meal has no linked donor. Please request a newly added meal.'
      })
    }

    const existingRequest = await MealRequest.findOne({
      meal: meal._id,
      receiver: req.user.id
    })

    if (existingRequest) {
      return res.status(400).json({ message: 'You already requested this meal' })
    }

    const request = await MealRequest.create({
      meal: meal._id,
      donor: meal.donor,
      receiver: req.user.id
    })

    res.status(201).json({
      message: 'Meal request sent to the donor',
      request
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You already requested this meal' })
    }

    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const getMyRequests = async (req, res) => {
  try {
    const filter =
      req.user.role === 'donor'
        ? { donor: req.user.id }
        : { receiver: req.user.id }

    const requests = await populateRequest(
      MealRequest.find(filter).sort({ createdAt: -1 })
    )

    res.json(
      requests.map((request) => hidePrivateContact(request, req.user.id))
    )
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Only donors can review requests' })
    }

    const { status } = req.body

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid request status' })
    }

    const request = await MealRequest.findOne({
      _id: req.params.id,
      donor: req.user.id
    })

    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }

    if (request.status !== 'Pending') {
      return res.status(400).json({ message: 'This request was already reviewed' })
    }

    if (status === 'Accepted') {
      const meal = await Meal.findOneAndUpdate(
        { _id: request.meal, quantity: { $gt: 0 } },
        { $inc: { quantity: -1 } },
        { new: true }
      )

      if (!meal) {
        return res.status(400).json({ message: 'This meal is no longer available' })
      }
    }

    request.status = status
    await request.save()

    const populatedRequest = await populateRequest(
      MealRequest.findById(request._id)
    )

    res.json({
      message: `Request ${status.toLowerCase()}`,
      request: hidePrivateContact(populatedRequest, req.user.id)
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { createRequest, getMyRequests, updateRequestStatus }
