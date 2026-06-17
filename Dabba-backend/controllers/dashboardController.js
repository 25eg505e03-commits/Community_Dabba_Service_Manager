const Meal = require("../models/Meal");

const getStats = async (req, res) => {
  const totalMeals = await Meal.countDocuments();

  res.json({
    totalMeals
  });
};

module.exports = { getStats };