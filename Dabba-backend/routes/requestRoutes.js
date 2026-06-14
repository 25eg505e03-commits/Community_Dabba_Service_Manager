const express = require('express')
const protect = require('../middleware/authMiddleware')
const {
  createRequest,
  getMyRequests,
  updateRequestStatus
} = require('../controllers/requestController')

const router = express.Router()

router.use(protect)
router.get('/', getMyRequests)
router.post('/:mealId', createRequest)
router.patch('/:id/status', updateRequestStatus)

module.exports = router
