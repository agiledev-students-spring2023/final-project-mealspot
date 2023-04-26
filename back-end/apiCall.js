// A collection of helper functions that make calls to various Spoonacular API endpoints
// These functions can be used in app.js to make the code easier to read and write.
// NOTE: The .env file with the correct API_KEY is needed in the back-end directory for this code to work
// Contact Charlotte if you don't have the file yet
require('dotenv').config({ silent: true });
const axios = require('axios');

/*
NOTE:
All functions that return a recipe return it as an object in this form:
  id: number,
  recipeName: string,
  image: image,
  instructions: string,
  ingredients: array of objects of the form {ingredientString: string, id: number},
  price: number,
  saved: boolean
*/

// Helper function that gets only the necessary information for displaying a recipe in our app, e.g. on the recipe search, saved recipes, or meal plan page
async function simplifyRecipe(recipe) {
  // Get information on this recipe's price and its ingredients
  const options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/priceBreakdownWidget.json`,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  };
  const response = await axios(options);
  const price = Number(response.data.totalCostPerServing / 100).toFixed(2);

  /*
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

  // Include ingredient IDs in the ingredients
  ingredients.forEach((ing, i) => {
    ing.id = recipe.extendedIngredients[i].id;
  })
  */

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
    },
  ];

  // Include ingredient IDs in the ingredients
  ingredients.forEach((ing, i) => {
    ing.id = recipe.extendedIngredients[i].id;
  })

  const image = recipe.image ? recipe.image : '';

  return {
    id: recipe.id,
    recipeName: recipe.title,
    image: image,
    instructions: recipe.instructions,
    ingredients: ingredients,
    price: price,
    saved: false, // defaults to false, is updated in the route in app.js
  };
}

// Get Random Recipes - used for the recipe search page
async function getRandomRecipes(numRecipes) {
  try {
    // Get the raw recipes data from the Spoonacular API
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
      params: { number: numRecipes },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };
    const response = await axios(options);

    // Box all the raw data into recipe objects, and return the array of them
    // Note that all recipes are reduced to just 1 serving of the recipe
    return await Promise.all(
      response.data.recipes.map(async (recipe) => simplifyRecipe(recipe))
    );
  } catch (err) {
    console.log(err);
  }
}

// Helper function for ingredient amounts
// Code attribution: Nikhilesh Aleti, https://www.tutorialspoint.com/decimal-count-of-a-number-in-javascript
function countDecimals(num) {
  const str = num.toString();
  if (str.includes('.')) {
    return str.split('.')[1].length;
  }
  return 0;
}

// Takes the ID number and quantity of an ingredient
// Returns the corresponding ingredient's name and the price for the given quantity (in dollars)
// If the ID doesn't correspond to any ingredient, returns an object that has status failure
// To be used for fridge GET and grocery list GET
async function getIngredientByID(ingredientID, quantity) {
  try {
    const options = {
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/${ingredientID}/information`,
      params: { amount: quantity },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    const response = await axios(options);
    if (response.status === 'failure' && response.code === 404) {
      // Given ID doesn't have a corresponding ingredient
      return {
        status: 'failure',
      };
    } // Found the corresponding ingredient
    return {
      id: ingredientID,
      ingredientName: response.data.name,
      quantity: quantity,
      // price: Number(response.data.estimatedCost.value / 100).toFixed(2),
    };
  } catch (err) {
    console.log(err);
  }
}

// Find an ingredient by a search query, returns the ID of the cheapest matching ingredient, or -1 if this ingredient is not recognized
// To be used for the fridge POST and grocery list POST
async function getIngredientByName(ingredientName) {
  try {
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search',
      params: {
        query: ingredientName,
        number: '1',
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    const response = await axios(options);

    if (response.data.results.length === 0) {
      // Ingredient not recognized - no results for this query
      return -1;
    } // Ingredient recognized - 1 result for this query
    return getIngredientByID(response.data.results[0].id);
  } catch (err) {
    console.log(err);
  }
}

// Takes the ID number of a recipe
// Returns the corresponding recipe's information
// If the ID doesn't correspond to any recipe, returns an object that has status failure
// To be used for saved recipes GET and meal plan GET
async function getRecipeByID(recipeID) {
  try {
    const options = {
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/information`,
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    const response = await axios(options);

    if (response.status === 'failure' && response.code === 404) {
      // Given ID doesn't have a corresponding recipe
      return {
        status: 'failure',
      };
    } // Found the corresponding recipe - simplify it to just the info that we need, and return it
    return simplifyRecipe(response.data);
  } catch (err) {
    console.log(err);
  }
}

// Takes an array of strings - each string is a query string for an ingredient name
// Returns at most 4 recipes that use those ingredients (empty array if no matching recipes were found)
// To be used for recommendation feature in saved recipes GET and recipe search GET
async function getRecipesByIngredients(numRecipes, ingredients) {
  try {
    const commaSep = ingredients.reduce((accum, curr) => {
      return accum + curr.ingredientName + ',';
    }, '');

    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: commaSep,
        number: numRecipes,
        ignorePantry: 'true',
        ranking: '1',
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    // The data returned by the API here is an array of recipes
    const response = await axios(options);

    // Map that array into an array of those recipes, but simplified to just the info we need
    const recipes = await Promise.all(
      response.data.map(async (recipe) => await getRecipeByID(recipe.id))
    );

    return recipes;
  } catch (err) {
    console.log(err);
  }
}

// Takes a search query and returns an array of the recipes that match that query (matches based on recipe name and ingredients)
// Number of recipes that are in the returned array is set by the parameter numResults
// To be used for recipe search page
async function searchRecipes(searchQuery, numResults) {
  try {
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
      params: {
        query: searchQuery,
        number: numResults,
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    const response = await axios(options);

    if (response.data.results.length === 0) {
      // No recipes found that match this query
      return -1;
    } // Return the matching recipes that were found
    const recipes = await Promise.all(
      response.data.results.map(
        async (recipe) => await getRecipeByID(recipe.id)
      )
    );
    return recipes;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getRandomRecipes: getRandomRecipes,
  getIngredientByName: getIngredientByName,
  getIngredientByID: getIngredientByID,
  getRecipeByID: getRecipeByID,
  getRecipesByIngredients: getRecipesByIngredients,
  searchRecipes: searchRecipes,
};
