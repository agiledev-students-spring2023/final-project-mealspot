// A collection of helper functions that make calls to various Spoonacular API endpoints
// These functions can be used in app.js to make the code easier to read and write.
// NOTE: The .env file with the correct API_KEY is needed in the back-end directory for this code to work
// Contact Charlotte if you don't have the file yet
require('dotenv').config({ silent: true });
const axios = require('axios');

// Get Random Recipes - used for the recipe search page
async function getRandomRecipes(numRecipes) {
  try {
      // Get the raw recipes data from the Spoonacular API
      const options = {
          method: 'GET',
          url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
          params: {number: numRecipes},
          headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
          }
      };      
      const response = await axios(options);

      // Box all the raw data into recipe objects, and return the array of them
      // Note that all recipes are reduced to just 1 serving of the recipe
      return await Promise.all(response.data.recipes.map(async(recipe) => simplifyRecipe(recipe)));
  } catch (err) {
      console.log(err);
  }
}

// Helper function that gets only the necessary information for displaying a recipe on the recipe search page
async function simplifyRecipe(recipe) {
  // Get information on this recipe's price and its ingredients
  const options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/priceBreakdownWidget.json`,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  const response = await axios(options);
  const price = Number(response.data.totalCostPerServing / 100).toFixed(2);

  const ingredients = response.data.ingredients.map((ing) => {
    const name = ing.name;
    let amount = ing.amount.us.value / recipe.servings;
    if (countDecimals(amount) >= 2) {
      amount = Number(ing.amount.us.value / recipe.servings).toFixed(2);
    }
    const units = ing.amount.us.unit;
    return {
      ingredientString: `${amount} ${units} ${name}`,
    }
  });
  
  /*
  // TODO for testing purposes, only do one ingredient
  const ing = response.data.ingredients[0];
  const name = ing.name;
  let amount = ing.amount.us.value / recipe.servings;
  if (countDecimals(amount) >= 2) {
    amount = Number(ing.amount.us.value / recipe.servings).toFixed(2);
  }
  const units = ing.amount.us.unit;
  const ingredients = [
    {
      ingredientString: `${amount} ${units} ${name}`,
    }
  ]
  */
  
  const image = recipe.image ? recipe.image : "";

  return {
    id: recipe.id,
    recipeName: recipe.title,
    image: image,
    instructions: recipe.instructions,
    ingredients: ingredients,
    price: price,
    saved: false // TODO: database interaction: check to see if this recipe's ID is included in the user's saved list
  }
};

// Helper function for ingredient amounts
// Code attribution: Nikhilesh Aleti, https://www.tutorialspoint.com/decimal-count-of-a-number-in-javascript
function countDecimals(num) {
  const str = num.toString();
  if (str.includes('.')) {
     return str.split('.')[1].length;
  };
  return 0;
}

// TODO: write functions for...
// ingredient search, for fridge and grocery list
// get recipe information, for saved recipes and meal plan
// get recipe by ingredients, for saved recipes and recipe search

module.exports = {
  getRandomRecipes: getRandomRecipes,
}