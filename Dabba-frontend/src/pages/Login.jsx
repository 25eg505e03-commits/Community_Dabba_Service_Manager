import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  // notice "async" added here
  async function handleSubmit(e) {
    e.preventDefault()

    if (email === '' || password === '') {
      setError('Please fill all fields')
      return
    }

    // "await" pauses until backend responds
    const result = await loginUser(email, password)

    if (result.success) {
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="page-center">
      <div className="login-container">
        <h2>Sign In</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button type="submit">Sign In</button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login