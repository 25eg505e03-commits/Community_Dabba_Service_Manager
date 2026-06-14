import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/api'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [role, setRole] = useState("receiver");

  const navigate = useNavigate()

  // notice "async" added here
  async function handleSubmit(e) {
    e.preventDefault()

    if (name === '' || email === '' || password === '') {
      setError('All fields are required')
      setSuccess('')
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters')
      setSuccess('')
      return
    }

    // "await" pauses until backend responds
    const result = await registerUser(name, email, password, phone, role)

    if (result.success) {
      setError('')
      setSuccess('Registration successful! You can login now.')
      setName('')
      setEmail('')
      setPassword('')
      setPhone('')

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } else {
      setError(result.message)
      setSuccess('')
    }
  }

  return (
    <div className="page-center">
      <div className="register-container">
        <h2>Create an Account</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

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
            placeholder="Min. 4 characters"
          />

          <label>Phone Number (optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />

          <label>I want to</label>

<select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="receiver">Receive meals</option>
  <option value="donor">Donate meals</option>
</select>

          <button type="submit">Create Account</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
