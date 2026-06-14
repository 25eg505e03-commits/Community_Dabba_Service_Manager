import React, { useState } from 'react'
import { addSubscription } from '../services/api'

function Subscription() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [area, setArea] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (name === '' || email === '' || area === '') {
      setMessage('Please fill all fields')
      return
    }

    const result = await addSubscription(name, email, area)

    if (result.success) {
      setMessage('Subscription saved successfully!')
      setName('')
      setEmail('')
      setArea('')
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div className="subscription-container">
      <h2>Meal Subscription</h2>

      {message && <p className="message-text">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
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
          placeholder="Enter your email"
        />

        <label>Area</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Enter your area"
        />

        <button type="submit">Subscribe</button>
      </form>
    </div>
  )
}

export default Subscription