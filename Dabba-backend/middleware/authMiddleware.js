// This middleware checks if the user has sent a valid JWT token
// We use this to protect routes that should only be accessible to logged-in users
const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  // Token is usually sent like: Authorization: Bearer <token>
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No token, access denied' })
  }

  try {
    // Extract the token part (remove "Bearer ")
    const token = authHeader.split(' ')[1]

    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Add the decoded user info to the request object
req.user = { id: decoded.id, role: decoded.role };

    // Move to the next function (the actual route)
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = protect