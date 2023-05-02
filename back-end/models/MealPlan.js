const mongoose = require('mongoose');

const { Schema } = mongoose;

// Mongoose model of a meal plan, which belongs to a specific user
const MealPlanSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Sunday
  0: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  // Monday
  1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  // Tuesday
  2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  // Wednesday
  3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  // Thursday
  4: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  // Friday
  5: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  // Sunday
  6: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
});

// create a model from this schema
const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

// export the model
module.exports = MealPlan;
