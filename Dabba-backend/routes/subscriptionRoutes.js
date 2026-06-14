// This file defines the URL paths for subscriptions
const express = require('express')
const router = express.Router()
const { addSubscription, getSubscriptions } = require('../controllers/subscriptionController')

// POST /api/subscriptions
router.post('/', addSubscription)

// GET /api/subscriptions
router.get('/', getSubscriptions)

module.exports = router