import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMeals, getSubscriptions, getFeedback } from '../services/api'

function Dashboard() {
  const [userName, setUserName] = useState('')
  const [totalMeals, setTotalMeals] = useState(0)
  const [totalSubscribers, setTotalSubscribers] = useState(0)
  const [totalFeedback, setTotalFeedback] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserName(user.name)
    }

    async function loadOverview() {
      const [meals, subscriptions, feedback] = await Promise.all([
        getMeals(),
        getSubscriptions(),
        getFeedback()
      ])

      setTotalMeals(meals.length)
      setTotalSubscribers(
        subscriptions.filter((item) => item.status === 'Active').length
      )
      setTotalFeedback(feedback.length)
    }

    loadOverview()
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // Get the first letter of the username for the avatar circle
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : 'U'

  return (
    <div className="dashboard-container">

      {/* Welcome box like the profile page in my blog project */}
      <div className="welcome-box">
        <div className="welcome-box-left">
          <div className="avatar-circle">{firstLetter}</div>
          <div>
            <h3>Welcome back</h3>
            <h2>{userName}</h2>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <h3 className="section-title">Overview</h3>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Meals</h3>
          <p>{totalMeals}</p>
        </div>

        <div className="stat-box">
          <h3>Total Subscribers</h3>
          <p>{totalSubscribers}</p>
        </div>

        <div className="stat-box">
          <h3>Total Feedback</h3>
          <p>{totalFeedback}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
