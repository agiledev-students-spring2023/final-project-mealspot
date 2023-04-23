const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose model of an ingredient, includes an ID number that corresponds to that recipe
const RecipeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    id: {
        type: Number,
        required: true,
    }
})

// create a model from this schema
const Recipe = mongoose.model("Recipe", RecipeSchema);

// export the model
module.exports = Recipe;