const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose model of an ingredient, includes an ID number that corresponds to that ingredient, the type (grocery or fridge), as well as the quantity of ingredient
const IngredientSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum : ['fridge','grocery'],
        required: true
    },
    id: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})

// create a model from this schema
const Ingredient = mongoose.model("Ingredient", IngredientSchema);

// export the model
module.exports = Ingredient;