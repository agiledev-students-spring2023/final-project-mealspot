const mongoose = require('mongoose');

const { Schema } = mongoose;

// Mongoose model of a meal plan, which belongs to a specific user
const MealPlanSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sunday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  monday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  tuesday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  wednesday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  thursday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  friday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
  saturday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
  },
});

// create a model from this schema
const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

// export the model
module.exports = MealPlan;
