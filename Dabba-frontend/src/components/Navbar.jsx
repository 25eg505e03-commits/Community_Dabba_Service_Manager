import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // function to add "active-link" class to the current page link
  function getClass(path) {
    return location.pathname === path ? 'active-link' : ''
  }

  return (
    <div className="navbar">
      <h2 className="navbar-title">MyDabba</h2>

      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/dashboard" className={getClass('/dashboard')}>Dashboard</Link>
            <Link to="/meals" className={getClass('/meals')}>Meals</Link>
            <Link to="/requests" className={getClass('/requests')}>Requests</Link>
            <Link to="/feedback" className={getClass('/feedback')}>Feedback</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={getClass('/login')}>Login</Link>
            <Link to="/register" className={getClass('/register')}>Register</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
