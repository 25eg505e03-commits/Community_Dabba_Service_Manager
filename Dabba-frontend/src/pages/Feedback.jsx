import React, { useState } from 'react'
import { addFeedback } from '../services/api'

function Feedback() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState('5')
  const [statusMsg, setStatusMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (name === '' || message === '') {
      setStatusMsg('Please fill all fields')
      return
    }

    const result = await addFeedback(name, rating, message)

    if (result.success) {
      setStatusMsg('Thank you for your feedback!')
      setName('')
      setMessage('')
      setRating('5')
    } else {
      setStatusMsg(result.message)
    }
  }

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>

      {statusMsg && <p className="message-text">{statusMsg}</p>}

      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Rating (1 to 5)</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label>Feedback Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback here"
          rows="4"
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  )
}

export default Feedback