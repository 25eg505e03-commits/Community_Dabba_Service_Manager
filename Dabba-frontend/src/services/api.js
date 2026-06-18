import axios from "axios";

const API_URL = "https://community-dabba-service-manager.onrender.com"

// Create one reusable Axios connection
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the login token to protected requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// REGISTER USER
export async function registerUser(name, email, password, phone, role) {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
      phone,
      role
    });
    return {
      success: true,
      message: response.data.message || "Registration successful",
      user: response.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong during registration",
    };
  }
}

// LOGIN USER 
export async function loginUser(email, password) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Invalid email or password"
    };
  }
}

// LOGOUT USER
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// ADD MEAL
export async function addMeal(mealName, description, quantity, location, donorName, expiryTime) {
  try {
    const response = await api.post("/api/meals", {
      mealName,
      description,
      quantity: Number(quantity),
      location,
      donorName,
      expiryTime: new Date(expiryTime).toISOString()
    });
    return {
      success: true,
      message: response.data.message,
      meal: response.data.meal
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Could not add meal"
    };
  }
}

// GET MEALS
export async function getMeals() {
  try {
    const response = await api.get("/api/meals");
    return response.data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

// DELETE MEAL
export async function deleteMeal(mealId) {
  try {
    const response = await api.delete(`/api/meals/${mealId}`);
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Could not delete meal"
    };
  }
}

// ADD FEEDBACK
export async function addFeedback(name, rating, message) {
  try {
    const response = await api.post("/api/feedback", { name, rating, message });
    return {
      success: true,
      message: response.data.message || "Feedback submitted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Could not submit feedback",
    };
  }
}

// GET FEEDBACK
export async function getFeedback() {
  try {
    const response = await api.get("/api/feedback");
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
}

// REQUEST MEAL
export async function requestMeal(mealId) {
  try {
    const response = await api.post(`/api/requests/${mealId}`);
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Could not request meal"
    };
  }
}

// GET MY MEAL REQUESTS
export async function getMyMealRequests() {
  try {
    const response = await api.get("/api/requests");
    return { success: true, requests: response.data };
  } catch (error) {
    return {
      success: false,
      requests: [],
      message: error.response?.data?.message || "Could not load requests"
    };
  }
}

// UPDATE MEAL REQUEST
export async function updateMealRequest(requestId, status) {
  try {
    const response = await api.patch(`/api/requests/${requestId}/status`, { status });
    return {
      success: true,
      message: response.data.message,
      request: response.data.request
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Could not update request"
    };
  }
}

export default api;