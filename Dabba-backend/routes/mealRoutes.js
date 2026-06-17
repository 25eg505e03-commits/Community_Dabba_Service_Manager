const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getMeals, addMeal,deleteMeal } = require("../controllers/mealController");

const donorOnly = (req, res, next) => {
  if (req.user.role !== "donor") {
    return res.status(403).json({
      message: "Only donors can add meals"
    });
  }

  next();
};

router.get("/", getMeals);
router.post("/", protect, donorOnly, addMeal);
router.delete("/:id", protect, donorOnly, deleteMeal);

module.exports = router;