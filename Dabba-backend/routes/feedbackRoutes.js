// This file defines the URL paths for feedback
const express = require('express')
const router = express.Router()
const { addFeedback, getFeedback } = require('../controllers/feedbackController')

// POST /api/feedback
router.post('/', addFeedback)

// GET /api/feedback
router.get('/', getFeedback)

module.exports = router