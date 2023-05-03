// Import and instantiate an express object
const express = require('express');

const app = express();

// Import helper functions for calling the recipe/ingredients API

// Import Mongoose models for MongoDB data manipulation
const mongoose = require('mongoose');

// Middleware imports
require('dotenv').config({ silent: true }); // load environmental variables from a hidden file named .env
const multer = require('multer'); // middleware to handle HTTP POST requests with file uploads
const axios = require('axios'); // middleware for making requests to APIs
const morgan = require('morgan'); // middleware for nice logging of incoming HTTP requests
const cors = require('cors'); // middleware to enable cross-origin resource sharing requests
// middleware for user authentication
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Recipe = require('./models/Recipe');
const Ingredient = require('./models/Ingredient');
const Day = require('./models/Day');
const MealPlan = require('./models/MealPlan');
const User = require('./models/User');
const apiCall = require('./apiCall');
const authRoutes = require('./auth-routes');

// Use the morgan middleware to log all incoming http requests
app.use(morgan('dev')); // morgan has a few logging default styles - dev is a nice concise color-coded style

// Use CORS middleware
app.use(cors());

// Use Express body parsing middleware
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// router for login/register functions
app.use('/auth', authRoutes());

// passport setup for auth
const jwtStrategy = require('./config/jwt-config'); // import setup options for using JWT in passport
const { _passReqToCallback } = require('./config/jwt-config');

passport.use(jwtStrategy);
app.use(passport.initialize());

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.URI, mongooseOpts)
  .then(() => console.log('Connected Successfully!'))
  .catch((err) => console.log(err));

// GET route for recipe homepage
app.get(
  '/', 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
  async function getRecipes(userId, budget, mealPlanId, dayOfWeek) {
    try {
        let meal = await Day.findOne({ mealPlan: mealPlanId, dayOfWeek: dayOfWeek });
        let recipes = [null, null, null];
        const mealPlan = await MealPlan.findOne({ _id: mealPlanId });
        // Get total cost of meals
        let spent = req.user.totalSpent;
        spent = spent.toFixed(2);

      // check if Day schema at current dayOfWeek is instantiated
      if(!meal) {
        meal = await new Day({ mealPlan: mealPlanId, dayOfWeek: dayOfWeek, breakfast: null, lunch: null, dinner: null }).save();
        mealPlan[dayOfWeek] = meal._id;
        await mealPlan.save();
      }

      // Access the 'breakfast', 'lunch', and 'dinner' field in the DaySchema
      if (meal.breakfast !== null) {
        recipes[0] = await apiCall.getRecipeByID(meal.breakfast);
      } else {
        recipes[0] = null;
      }
      if (meal.lunch !== null) {
        recipes[1] = await apiCall.getRecipeByID(meal.lunch);
      } else {
        recipes[1] = null;
      }
      if (meal.dinner !== null) {
        recipes[2] = await apiCall.getRecipeByID(meal.dinner);
      } else {
        recipes[2] = null;
      }
      res.json({
        budget: budget,
        spent: spent,
        recipes: recipes,
        dayOfWeek: dayOfWeek,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
  getRecipes(
    req.user._id,
    req.user.weeklyBudget,
    req.user.mealPlan[0],
    req.user.dayOfWeek
  );
});

// POST route for recipe homepage days of the week form
app.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.body.time) {
      console.log('Selected day: ' + req.body.day);
      req.user.dayOfWeek = req.body.day;
      let recipes = [null, null, null];
      meal = await Day.findOne({
        mealPlan: req.user.mealPlan,
        dayOfWeek: req.body.day,
      });
      if (meal !== null) {
        if (meal.breakfast !== null) {
          recipes[0] = await apiCall.getRecipeByID(meal.breakfast);
        } else {
          recipes[0] = null;
        }
        if (meal.lunch !== null) {
          recipes[1] = await apiCall.getRecipeByID(meal.lunch);
        } else {
          recipes[1] = null;
        }
        if (meal.dinner !== null) {
          recipes[2] = await apiCall.getRecipeByID(meal.dinner);
        } else {
          recipes[2] = null;
        }
      }
      res.json({ dayOfWeek: req.user.dayOfWeek, recipes: recipes });
    } else {
      console.log('Time of day: ' + req.body.time);
      req.user.timeOfDay = req.body.time;
    }
    await req.user.save();
  }
);

// GET route for recipe search page
app.get(
  '/recipesearch',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user._id);
    async function getRecipes(numRec, numOther) {
      try {
        // Database interaction that gets the ingredients in the fridge
        const fridgeIngredients = await Ingredient.find({ user: req.user._id });
        // Then map it to an array of ingredient names
        const ingredients = await Promise.all(
          fridgeIngredients.map(
            async (ing) => await apiCall.getIngredientByID(ing.id)
          )
        );

        // Get recommended recipes that match the ingredients in the user's fridge
        const recRecipes = await apiCall.getRecipesByIngredients(
          numRec,
          ingredients
        );

        // Get random recipes to populate the rest of the recipe search page
        const otherRecipes = await apiCall.getRandomRecipes(numOther);

        // Database interaction to determine if any recipe's ID is included in the user's saved recipe list
        recRecipes.forEach((recipe) => {
          const found = req.user.savedRecipes.includes(recipe.id);
          if (found) {
            // Mark this recipe as saved, because it was found in the user's saved recipes list
            recipe.saved = true;
          }
        });
        otherRecipes.forEach((recipe) => {
          const found = req.user.savedRecipes.includes(recipe.id);
          if (found) {
            // Mark this recipe as saved, because it was found in the user's saved recipes list
            recipe.saved = true;
          }
        });

        res.json({ recRecipes: recRecipes, otherRecipes: otherRecipes });
      } catch (err) {
        console.log(err);
      }
    }

    async function searchRecipes(searchQuery, numResults) {
      const searchResults = await apiCall.searchRecipes(
        searchQuery,
        numResults
      );
      // Database interaction to determine if any recipe's ID is included in the user's saved recipe list
      searchResults.forEach((recipe) => {
        const found = req.user.savedRecipes.includes(recipe.id);
        if (found) {
          // Mark this recipe as saved, because it was found in the user's saved recipes list
          recipe.saved = true;
        }
      });
      res.json({ searchResults: searchResults });
    }

    const numRec = '4';
    const numOther = '10';
    const numSearchResults = '10';

    // Default recipe display: user hasn't used the search bar
    if (!req.query.searchQuery) {
      getRecipes(numRec, numOther);
    }
    // Show only the search result recipes if the user uses the search bar
    else {
      searchRecipes(req.query.searchQuery, numSearchResults);
    }
  }
);

// POST route for recipe search page
// When user clicks the star button on a recipe card, it will save the recipe to the user's saved recipe list if it isn't saved yet
// ...or it will remove it from the user's saved recipe list if it is already on it
app.post(
  '/recipesearch',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Database interaction that saves the recipe to the user's saved recipes list
    async function saveRecipe() {
      console.log('Saving the recipe: ' + req.body.recipeName);
      try {
        const found = req.user.savedRecipes.includes(req.body.id);
        if (found) {
          throw new Error('already saved');
        }
        req.user.savedRecipes.push(req.body.id);
        await req.user.save();
      } catch (err) {
        console.log(err);
      }
    }
    // Database interaction here that removes the recipe from the user's saved recipes list
    async function unsaveRecipe() {
      console.log('Unsaving the recipe: ' + req.body.recipeName);
      try {
        await Recipe.findOneAndDelete({ user: req.user._id, id: req.body.id });
      } catch (err) {
        console.log(err);
      }
    }
    // Save a recipe
    if (req.body.save === true) {
      saveRecipe();
      res.json({ result: 'recipe saved' });
    } // Unsave a recipe
    else if (req.body.save === false) {
      unsaveRecipe();
      res.json({ result: 'recipe unsaved' });
    } else {
      // Invalid input
      res.status(400);
      res.json({ msg: 'invalid input' });
    }
  }
);

// GET route for saved recipes page
app.get(
  '/savedrecipes',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    async function getRecipes() {
      try {
        // Database interaction - get list of user's saved recipes ID from database
        const { savedRecipes } = req.user;
        // Map recipe IDs to actual recipes
        if (savedRecipes.length !== 0) {
          const allSavedRecipes = await Promise.all(
            savedRecipes.map(
              async (recipe) => await apiCall.getRecipeByID(recipe)
            )
          );

          // Mark all the recipes 'saved'
          allSavedRecipes.forEach((recipe) => {
            recipe.saved = true;
          });

          // Database interaction that gets the ingredients in the fridge (just IDs is sufficient)
          const fridgeIngredients = await Ingredient.find({
            user: req.user._id,
          });

          // Partition all saved recipes into recommended (ones whose ingredients match any of the fridge ingredients) and other
          const recRecipes = [];
          const otherRecipes = [];
          // Check each saved recipe to see if it includes a fridge ingredient and thus should be recommended
          allSavedRecipes.forEach((recipe) => {
            // Loop through fridge ingredients
            if (fridgeIngredients.length !== 0) {
              fridgeIngredients.every((fridgeIng) => {
                // Loop through recipe ingredients - if there's a match, push this recipe to the recommended recipes array
                // Otherwise, push this recipe to the other recipes array
                let matchFound = false;
                recipe.ingredients.every((recipeIng) => {
                  if (fridgeIng.id === recipeIng.id) {
                    recRecipes.push(recipe);
                    matchFound = true;
                    return false;
                  }
                });
                if (!matchFound) {
                  otherRecipes.push(recipe);
                }
              });
            } else {
              otherRecipes.push(recipe);
            }
          });
          res.json({ recRecipes: recRecipes, otherRecipes: otherRecipes });
        } else {
          res.json({ recRecipes: [], otherRecipes: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }

    getRecipes();
  }
);

// POST route for saved recipes page
// All the recipes on this page are already saved in the user's saved recipes list
// When user clicks the star button on a recipe card, it will remove it from the user's saved recipes list
app.post(
  '/savedrecipes',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Database interaction that removes the recipe from the user's saved recipes list
    async function unsaveRecipe() {
      console.log('Unsaving the recipe: ' + req.body.recipeName);
      try {
        req.user.savedRecipes = req.user.savedRecipes.filter(
          (e) => e !== req.body.id
        );
        await req.user.save();
      } catch (err) {
        console.log(err);
      }
    }

    // Unsave a recipe
    if (req.body.save === false) {
      // Should always be true
      unsaveRecipe();
      res.json({ result: 'recipe unsaved' });
    } else if (req.body.save === true) {
      // Requests from the saved recipes pages should always have save = false, because this page should only display already-saved recipes
      res.json({ result: 'this should not happen' });
    } else {
      // Invalid input
      res.status(400);
      res.json({ msg: 'invalid input' });
    }
  }
);

// GET route for choose from saved recipes page
app.get(
  '/choosesavedrecipes',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    async function getRecipes(testRecipes, testFridge) {
      try {
        // Database interaction - get list of user's saved recipes ID from database
        const { savedRecipes } = req.user;
        console.log(savedRecipes);
        // Map recipe IDs to actual recipes
        if (savedRecipes.length !== 0) {
          const allSavedRecipes = await Promise.all(
            savedRecipes.map(
              async (recipe) => await apiCall.getRecipeByID(recipe)
            )
          );

          // Mark all the recipes 'saved'
          allSavedRecipes.forEach((recipe) => {
            recipe.saved = true;
          });
          // Database interaction - get user's fridge (just IDs is sufficient)
          const fridgeIngredients = await Ingredient.find({
            user: req.user._id,
            type: 'fridge',
          });

          // Partition all saved recipes into recommended (ones whose ingredients match any of the fridge ingredients) and other
          const recRecipes = [];
          const otherRecipes = [];
          // Check each saved recipe
          allSavedRecipes.forEach((recipe) => {
            // Loop through fridge ingredients
            if (fridgeIngredients.length !== 0) {
              fridgeIngredients.every((fridgeIng) => {
                console.log('hi');
                // Loop through recipe ingredients - if there's a match, push this recipe to the recommended recipes array
                // Otherwise, push this recipe to the other recipes array
                let matchFound = false;
                recipe.ingredients.every((recipeIng) => {
                  if (fridgeIng.id === recipeIng.id) {
                    recRecipes.push(recipe);
                    matchFound = true;
                    return false;
                  }
                });
                if (!matchFound) {
                  otherRecipes.push(recipe);
                }
              });
            } else {
              otherRecipes.push(recipe);
            }
          });
          res.json({ recRecipes: recRecipes, otherRecipes: otherRecipes });
        } else {
          res.json({ recRecipes: [], otherRecipes: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
    getRecipes(require('./testRecipes.json'), require('./testFridge.json'));
  }
);

// POST route for choose from saved recipes page
app.post(
  '/choosesavedrecipes',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // This route should do a database interaction where the id of the recipe that was clicked on gets added to the user's meal plan in the database
    async function chooseRecipe() {
      req.user.totalSpent += Number(req.body.price);
      req.user.totalSpent = req.user.totalSpent.toFixed(2);
      await req.user.save();
      const mealPlan = await MealPlan.findOne({ user: req.user._id });
      const meal = await Day.findOne({
        mealPlan: mealPlan._id,
        dayOfWeek: req.user.dayOfWeek,
      });
      meal[req.user.timeOfDay] = req.body.id;
      await meal.save();
    }
    chooseRecipe();
  }
);

// GET route for account page
app.get(
  '/account',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      username: req.user.username,
      email: req.user.email,
      weeklyBudget: req.user.weeklyBudget,
    });
  }
);

// POST route for account page
app.post(
  '/account',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Change this user's budget
    // Make sure budget is a number
    if (req.body.budget && !isNaN(req.body.budget)) {
      req.user.weeklyBudget = req.body.budget;
      await req.user.save();
      res.json({ weeklyBudget: req.user.weeklyBudget });
      console.log(req.user.weeklyBudget);
    } else {
      // Invalid input
      res.status(400);
      res.json({ msg: 'invalid input' });
    }
  }
);

// GET route for my fridge page
app.get(
  '/fridge',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Retrieves the user's fridge items from the database.
    try {
      let response = await User.findOne({ username: req.user.username });
      const promises = response.fridge.map(async (ingredient) => {
        const ing = await Ingredient.findOne({
          user: req.user._id,
          _id: ingredient,
        });
        if (ing != null) {
          const ingName = await apiCall.getIngredientByID(ing.id, ing.quantity);
          return ingName;
        }
      });
      Promise.all(promises).then((ingredients) => {
        res.send(ingredients);
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// GET route for my grocery list page
app.get(
  '/grocerylist',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Retrieves the user's grocery list items from the database.
    try {
      let response = await User.findOne({ username: req.user.username });
      const promises = response.groceryList.map(async (ingredient) => {
        const ing = await Ingredient.findOne({
          user: req.user._id,
          _id: ingredient,
        });
        if (ing != null) {
          const ingName = await apiCall.getIngredientByID(ing.id, ing.quantity);
          return ingName;
        }
      });
      Promise.all(promises).then((ingredients) => {
        res.send(ingredients);
      });
    } catch (err) {
      console.log(err);
    }
  }
);

app.post(
  '/fridge',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Adds an ingredient into the user's fridge in the database
    if (req.body.postType === 'add') {
      try {
        let response = await User.findOne({ username: req.user.username });
        const ingredientId = await apiCall.getIngredientByName(req.body.name);
        if (ingredientId === -1) {
          res.send('error');
        } else {
          const promises = response.fridge.map(async (ingredient) => {
            const ing = await Ingredient.findOne({
              user: req.user._id,
              _id: ingredient,
            });
            if (ing != null) {
              if (ing.id === ingredientId.id) {
                return 'error';
              }
            }
            return 'noerror';
          });
          Promise.all(promises).then(async (dupeChecking) => {
            if (dupeChecking.includes('error')) {
              res.send('error');
            } else {
              const ingredient = new Ingredient({
                user: req.user._id,
                type: 'fridge',
                id: ingredientId.id,
                quantity: req.body.quantity,
              });
              await ingredient.save();
              response.fridge.push(ingredient);
              response.save();
              res.send('noerror');
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else if (req.body.postType === 'remove') {
      try {
        const ingredientObject = await apiCall.getIngredientByName(
          req.body.name
        );
        const deletedIng = await Ingredient.findOneAndDelete({
          user: req.user._id,
          type: 'fridge',
          id: ingredientObject.id,
        });
        const test = await User.findOneAndUpdate(
          { username: req.user.username },
          { $pull: { fridge: deletedIng._id } }
        );
      } catch (err) {
        console.log(err);
      }
    } else if (req.body.postType === 'removeAll') {
      try {
        const test = await User.findOneAndUpdate(
          { username: req.user.username },
          { $set: { fridge: [] } }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
);

app.post(
  '/grocerylist',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Adds an ingredient into the user's grocery list in the database
    if (req.body.postType === 'add') {
      try {
        let response = await User.findOne({ username: req.user.username });
        const ingredientId = await apiCall.getIngredientByName(req.body.name);
        if (ingredientId === -1) {
          res.send('error');
        } else {
          const promises = response.groceryList.map(async (ingredient) => {
            const ing = await Ingredient.findOne({
              user: req.user._id,
              _id: ingredient,
            });
            if (ing != null) {
              if (ing.id === ingredientId.id) {
                return 'error';
              }
            }
            return 'noerror';
          });
          Promise.all(promises).then(async (dupeChecking) => {
            if (dupeChecking.includes('error')) {
              res.send('error');
            } else {
              const ingredient = new Ingredient({
                user: req.user._id,
                type: 'grocery',
                id: ingredientId.id,
                quantity: req.body.quantity,
              });
              await ingredient.save();
              response.groceryList.push(ingredient);
              response.save();
              res.send('noerror');
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else if (req.body.postType === 'remove') {
      try {
        const ingredientObject = await apiCall.getIngredientByName(
          req.body.name
        );
        const deletedIng = await Ingredient.findOneAndDelete({
          user: req.user._id,
          type: 'grocery',
          id: ingredientObject.id,
        });
        const test = await User.findOneAndUpdate(
          { username: req.user.username },
          { $pull: { groceryList: deletedIng._id } }
        );
      } catch (err) {
        console.log(err);
      }
    } else if (req.body.postType === 'removeAll') {
      try {
        const test = await User.findOneAndUpdate(
          { username: req.user.username },
          { $set: { groceryList: [] } }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
);

// Export the express app
module.exports = app;
