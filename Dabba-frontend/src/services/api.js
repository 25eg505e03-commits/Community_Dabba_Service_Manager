import axios from "axios";

const API_URL = "http://localhost:5000/api";

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
    const response = await api.post("/auth/register", {
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
      message:
        error.response?.data?.message ||
        "Something went wrong during registration",
    };
  }
}

// LOGIN USER
export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
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
export async function addMeal(
  mealName,
  description,
  quantity,
  location,
  donorName
) {
  try {
    const response = await api.post("/meals", {
      mealName,
      description,
      quantity: Number(quantity),
      location,
      donorName
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
    const response = await api.get("/meals");
    return response.data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

// ADD SUBSCRIPTION
export async function addSubscription(name, email, area) {
  try {
    const response = await api.post("/subscriptions", {
      name,
      email,
      area,
    });

    return {
      success: true,
      message:
        response.data.message ||
        "Subscription added successfully",
      subscription: response.data.subscription,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Could not add subscription",
    };
  }
}

// GET CURRENT USER'S SUBSCRIPTIONS
export async function getSubscriptions() {
  try {
    const response = await api.get("/subscriptions");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
}

// ADD FEEDBACK
export async function addFeedback(name, rating, message) {
  try {
    const response = await api.post("/feedback", {
      name,
      rating,
      message,
    });

    return {
      success: true,
      message:
        response.data.message ||
        "Feedback submitted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Could not submit feedback",
    };
  }
}

export async function getFeedback() {
  try {
    const response = await api.get("/feedback");
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
}

export async function requestMeal(mealId) {
  try {
    const response = await api.post(`/requests/${mealId}`);
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Could not request meal"
    };
  }
}

export async function getMyMealRequests() {
  try {
    const response = await api.get("/requests");
    return { success: true, requests: response.data };
  } catch (error) {
    return {
      success: false,
      requests: [],
      message: error.response?.data?.message || "Could not load requests"
    };
  }
}

export async function updateMealRequest(requestId, status) {
  try {
    const response = await api.patch(`/requests/${requestId}/status`, {
      status
    });

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
