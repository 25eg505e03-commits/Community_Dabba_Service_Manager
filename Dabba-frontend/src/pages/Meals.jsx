import React, { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import { addMeal, getMeals, requestMeal } from "../services/api";

function Meals() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isDonor = user.role === "donor";

  const [meals, setMeals] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    mealName: "",
    description: "",
    quantity: "",
    location: "",
    donorName: user.name || "",
    expiryTime: ""
  });

  async function loadMeals() {
    const data = await getMeals();
    setMeals(data);
  }

  useEffect(() => {
    loadMeals();

    // Re-fetch every 30 seconds so meals that just expired
    // disappear from the list without needing a page reload.
    const intervalId = setInterval(loadMeals, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.mealName.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!isDonor) {
      setMessage("Only donors can add meals.");
      return;
    }

    if (
      !form.mealName ||
      !form.description ||
      !form.quantity ||
      !form.location ||
      !form.donorName ||
      !form.expiryTime
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (Number(form.quantity) < 1) {
      setMessage("Quantity must be at least 1.");
      return;
    }

    const result = await addMeal(
      form.mealName,
      form.description,
      form.quantity,
      form.location,
      form.donorName,
      form.expiryTime
    );

    if (result.success) {
      setMessage("Meal added successfully!");

      setForm({
        mealName: "",
        description: "",
        quantity: "",
        location: "",
        donorName: user.name || "",
        expiryTime: ""
      });

      await loadMeals();
    } else {
      setMessage(result.message);
    }
  }

  async function handleRequest(mealId) {
    const result = await requestMeal(mealId);

    console.log(result);

    alert(result.message);

    setMessage(result.message);

    await loadMeals();
  }

  return (
    <div className="meals-container">
      {isDonor ? (
        <div className="add-meal-box">
          <h2>Add Community Meal</h2>

          {message && <p className="message-text">{message}</p>}

          <form onSubmit={handleSubmit}>
            <label>Meal Name</label>
            <input
              type="text"
              name="mealName"
              value={form.mealName}
              onChange={handleChange}
              placeholder="Example: Vegetable Thali"
            />

            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the meal"
              rows="3"
            />

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Number of meal boxes"
              min="1"
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Example: Indiranagar"
            />

            <label>Donor Name</label>
            <input
              type="text"
              name="donorName"
              value={form.donorName}
              onChange={handleChange}
              placeholder="Enter donor name"
            />
            <label>Expiry Time</label>
            <input
            type="datetime-local"
            name="expiryTime"
            value={form.expiryTime}
            onChange={handleChange}
            />
            <button type="submit">Add Meal</button>
          </form>
        </div>
      ) : (
        <p className="message-text">
          You are registered as a receiver. You can view available meals.
        </p>
      )}

      <h2 className="available-meals-title">Available Meals</h2>

      <p className="page-subtitle">
        Food shared by people in our community.
      </p>

      <input
        type="text"
        placeholder="🔍 Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <div className="meals-list">
        {filteredMeals.length === 0 ? (
          <p className="empty-message">No meals found.</p>
        ) : (
          filteredMeals.map((meal) => (
            <MealCard
              key={meal._id}
              isReceiver={!isDonor}
              onRequest={handleRequest}
              meal={{
                ...meal,
                name: meal.mealName,
                type: meal.location
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Meals;