const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const http = require("http");
const { Server } = require("socket.io");

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

app.set("io", io);
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)// allows frontend (different port) to talk to backend
app.use(express.json()) // allows server to read JSON data from request body

// Import routes
const authRoutes = require('./routes/authRoutes')
const mealRoutes = require('./routes/mealRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const requestRoutes = require('./routes/requestRoutes')
const dashboardRoutes = require('./routes/dashboradRoutes')

// Use routes
app.use('/api/auth', authRoutes)
app.use('/api/meals', mealRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Simple test route
app.get('/', (req, res) => {
  res.send('Community Dabba Service Manager API is running')
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})