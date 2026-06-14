# Community Dabba Service Manager

## Project Overview

Community Dabba Service Manager is a full-stack web application developed to reduce food wastage and help people in need. The platform connects food donors with receivers and provides a simple system for managing meal donations, meal requests, subscriptions, and feedback.

The application allows donors to share available meals and enables receivers to request those meals. Contact details remain hidden until a donor accepts a request, ensuring privacy and security.

---

## Features

### User Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Access (Donor / Receiver)

### Donor Features

* Add Available Meals
* View Meal Requests
* Accept Meal Requests
* Reject Meal Requests
* View Receiver Contact Details After Acceptance

### Receiver Features

* Browse Available Meals
* Request Meals
* View Request Status
* Access Donor Contact Details After Acceptance

### Additional Features

* Subscription Management
* Feedback Submission
* Dashboard Overview
* Protected Routes
* Responsive Design

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv
* cors

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render

---

##  Project Structure

```text
Community_Dabba_Service_Manager
│
├── Dabba-frontend
│
│   ├── src
│   │
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── MealCard.jsx
│   │
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Meals.jsx
│   │   ├── Subscription.jsx
│   │   ├── Feedback.jsx
│   │   └── MealRequests.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── styles
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── Dabba-backend
│
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── mealController.js
│   │   ├── requestController.js
│   │   ├── subscriptionController.js
│   │   └── feedbackController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Meal.js
│   │   ├── MealRequest.js
│   │   ├── Subscription.js
│   │   └── Feedback.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── mealRoutes.js
│   │   ├── requestRoutes.js
│   │   ├── subscriptionRoutes.js
│   │   └── feedbackRoutes.js
│   │
│   ├── server.js
│   └── .env
│
└── README.md
```

---

##  Database Models

### User

* name
* email
* password
* phone
* role (donor / receiver)

### Meal

* mealName
* description
* quantity
* location
* donor
* donorName

### MealRequest

* meal
* donor
* receiver
* status

### Subscription

* name
* email
* area

### Feedback

* name
* rating
* message

---

## Authentication

The application uses JWT (JSON Web Token) authentication.

Users can:

* Register
* Login
* Access protected routes
* Perform actions based on their role

---

##  API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Meals

```http
GET /api/meals
POST /api/meals
```

### Meal Requests

```http
POST /api/requests/:mealId
GET /api/requests
PATCH /api/requests/:id/status
```

### Subscriptions

```http
POST /api/subscriptions
GET /api/subscriptions
```

### Feedback

```http
POST /api/feedback
GET /api/feedback
```

---

##  Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

##  Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

##  Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

##  Future Enhancements

* Real-time notifications
* Email notifications
* Admin dashboard
* Meal search and filtering
* Location-based meal discovery
* Image upload support
* Mobile application

---

##  Developed By

**Nigama Vydyula**

Community Dabba Service Manager was developed as a full-stack web application project to demonstrate practical implementation of MERN stack concepts including authentication, CRUD operations, role-based access control, API development, and database management.

---
