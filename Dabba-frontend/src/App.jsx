import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Meals from './pages/Meals'
import Feedback from './pages/Feedback'
import ProtectedRoute from './components/ProtectedRoute'
import MealRequests from './pages/MealRequests'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/requests" element={<MealRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
