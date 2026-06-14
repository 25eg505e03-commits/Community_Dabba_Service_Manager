import React from 'react'

function MealCard({ meal, isReceiver, onRequest }) {
  return (
    <div className="meal-card">
      <span className="meal-type">{meal.type}</span>
      <h3>{meal.name}</h3>
      <p>{meal.description}</p>
      <div className="meal-meta">
        <span>Quantity: {meal.quantity}</span>
        <span>By: {meal.donorName}</span>
      </div>

      {isReceiver && (
        <button
          className="request-meal-btn"
          disabled={false}
          onClick={() => onRequest(meal._id)}
        >
          {meal.quantity < 1 ? "Not Available" : "Request Meal"}
        </button>
      )}
    </div>
  )
}

export default MealCard
