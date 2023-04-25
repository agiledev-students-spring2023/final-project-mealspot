const mongoose = require('mongoose');

const { Schema } = mongoose;

// Mongoose model of a day, which belongs to a specific meal plan
// A day consists of three meals (i.e. 3 recipes). Each meal is represented by an ID number, which corresponds to a specific recipe in the API
const DaySchema = new Schema({
  mealPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealPlan',
    required: true,
  },
  breakfast: {
    type: Number,
  },
  lunch: {
    type: Number,
  },
  dinner: {
    type: Number,
  },
});

// create a model from this schema
const Day = mongoose.model('Day', DaySchema);

// export the model
module.exports = Day;
