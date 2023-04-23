// Import and instantiate an express object
const express = require('express');

const app = express();

// Import helper functions for calling the recipe/ingredients API
const apiCall = require('./apiCall.js');

// Import Mongoose models for MongoDB data manipulation
const mongoose = require("mongoose");
const User = require("./models/User.js");
const MealPlan = require("./models/MealPlan.js");
const Day = require("./models/Day.js");
const Ingredient = require("./models/Ingredient.js");
const Recipe = require("./models/Recipe.js");

// Middleware imports
require('dotenv').config({ silent: true }); // load environmental variables from a hidden file named .env
const multer = require('multer'); // middleware to handle HTTP POST requests with file uploads
const axios = require('axios'); // middleware for making requests to APIs
const morgan = require('morgan'); // middleware for nice logging of incoming HTTP requests
const cors = require('cors'); // middleware to enable cross-origin resource sharing requests
// middleware for user authentication
const jwt = require("jsonwebtoken")
const passport = require("passport")
const authRoutes = require("./auth-routes.js")

// Use the morgan middleware to log all incoming http requests
app.use(morgan('dev')); // morgan has a few logging default styles - dev is a nice concise color-coded style

// Use CORS middleware
app.use(cors());

// Use Express body parsing middleware
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// router for login/register functions
app.use("/auth", authRoutes())

// passport setup for auth
const jwtStrategy = require("./config/jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)
app.use(passport.initialize())

const mongooseOpts = {
  useNewUrlParser: true,  
  useUnifiedTopology: true
};

mongoose.connect(process.env.URI, mongooseOpts)
.then(() => console.log("Connected Successfully!"))
.catch((err) => console.log(err));


// GET route for recipe homepage
app.get('/', (req, res) => {
  async function getRecipes(url) {
    try {
      const response = await axios(url);
      res.json(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  getRecipes('https://my.api.mockaroo.com/recipe.json?key=cf37bb40');
});

// POST route for recipe homepage days of the week form
app.post('/', (req, res) => {
  // Unsave a recipe
  console.log('Selected day: ' + req.body.day);
  const day = parseInt(req.body.day);
  if (isNaN(day) || day < 0 || day > 6) {
    return res.status(400).json({
      status: 'error',
    });
  }
  return res.json({
    status: 'ok',
  });
});

// GET route for homepage recipe edit page
app.get('/choosepage', (req, res) => {
  // change later
  res.send(req.body);
});

// GET route for homepage recipe edit page
app.get('/choosepage', (req, res) => {
  // change later
  res.send(req.body);
});

// GET route for recipe search page
app.get('/recipesearch', passport.authenticate("jwt", { session: false }), (req, res) => {
  console.log(req.user._id)
  async function getRecipes(numRec, numOther) {
    try {
      // Database interaction that gets the ingredients in the fridge
      const fridgeIngredients = await Ingredient.find({'user': req.user._id});
      // Then map it to an array of ingredient names
      const ingredients = fridgeIngredients.map(async(ing) => await apiCall.getIngredientByID(ing.id));
      // TODO test const ingredients = ['egg','butter','lemon','sugar'];

      // Get recommended recipes that match the ingredients in the user's fridge
      const recRecipes = await apiCall.getRecipesByIngredients(numRec, ingredients);

      // Get random recipes to populate the rest of the recipe search page
      const otherRecipes = await apiCall.getRandomRecipes(numOther);

      // Database interaction to determine if any recipe's ID is included in the user's saved recipe list
      recRecipes.forEach(async (recipe) => {
        const found = await Recipe.findOne({'user': req.user._id, 'id': recipe.id});
        if (found) {
          // Mark this recipe as saved, because it was found in the user's saved recipes list
          recipe.saved = true;
        }
      })
      otherRecipes.forEach(async (recipe) => {
        const found = await Recipe.findOne({'user': req.user._id, 'id': recipe.id});
        if (found) {
          // Mark this recipe as saved, because it was found in the user's saved recipes list
          recipe.saved = true;
        }
      })

      res.json({ recRecipes: recRecipes, otherRecipes: otherRecipes });
    } catch (err) {
      console.log(err);
    }
  }

  async function searchRecipes(searchQuery, numResults) {
    const searchResults = await apiCall.searchRecipes(searchQuery, numResults);
    res.json({ searchResults: searchResults });
  }

  const numRec = '1';
  const numOther = '1';
  const numSearchResults = '1';

  // Default recipe display: user hasn't used the search bar
  if (!req.query.searchQuery) {
    getRecipes(numRec, numOther);
  }
  // Show only the search result recipes if the user uses the search bar
  else {
    searchRecipes(req.query.searchQuery, numSearchResults);
  }
});

// POST route for recipe search page
// When user clicks the star button on a recipe card, it will save the recipe to the user's saved recipe list if it isn't saved yet
// ...or it will remove it from the user's saved recipe list if it is already on it
app.post('/recipesearch', passport.authenticate("jwt", { session: false }), (req, res) => {
  // Database interaction that saves the recipe to the user's saved recipes list
  async function saveRecipe() {
    console.log('Saving the recipe: ' + req.body.recipeName);
    try {
      const recipeToSave = new Recipe({user: req.user._id, id: req.body.id});
      await recipeToSave.save();
    } catch (err) {
      console.log(err);
    }
  }
  // Database interaction here that removes the recipe from the user's saved recipes list
  async function unsaveRecipe() {
    console.log('Unsaving the recipe: ' + req.body.recipeName);
    try {
      await Recipe.findOneAndDelete({user: req.user._id, id: req.body.id});
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
});

// GET route for saved recipes page
app.get('/savedrecipes', passport.authenticate("jwt", { session: false }), (req, res) => {
  async function getRecipes(testRecipes, testFridge) {
    try {
      // Database interaction - get list of user's saved recipes ID from database
      const savedRecipes = await Recipe.find({'user': {$in: req.user._id}});
      // Map recipe IDs to actual recipes
      if (savedRecipes.length !== 0) {
        const allSavedRecipes = savedRecipes.map(async(recipe) => await apiCall.getRecipeByID(recipe.id));
        // TODO test const allSavedRecipes = testRecipes;

        // Mark all the recipes 'saved'
        allSavedRecipes.forEach((recipe) => { recipe.saved = true });

        // Database interaction - get user's fridge (just IDs is sufficient)
        const fridgeIngredients = await Ingredient.find({'user': req.user._id, type: 'fridge'});
        // TODO test const fridgeIngredients = testFridge.ingredients;
        
        // Partition all saved recipes into recommended (ones whose ingredients match any of the fridge ingredients) and other
        const recRecipes = [];
        const otherRecipes = [];
        // Check each saved recipe
        // allSavedRecipes.forEach((data) => {
        //   data.then((recipe) => {
        //     // // Loop through fridge ingredients
        //     // fridgeIngredients.every((fridgeIng) => {
        //     //   // Loop through recipe ingredients - if there's a match, push this recipe to the recommended recipes array
        //     //   // Otherwise, push this recipe to the other recipes array
        //     //   let matchFound = false;
        //     //   recipe.ingredients.every((recipeIng) => {
        //     //     if (fridgeIng.id === recipeIng.id) {
        //     //       recRecipes.push(recipe);
        //     //       matchFound = true;
        //     //       return false;
        //     //     }
        //     //   });
        //     //   if (!matchFound) {
        //     //     otherRecipes.push(recipe);
        //     //   }
        //     // });
        //     otherRecipes.push(recipe);
        //     console.log(otherRecipes)
        //   })
        // });

        Promise.all(allSavedRecipes).then((values) => {
          res.json({ recRecipes: values, otherRecipes: []})
        });
        
      } else {
        res.json({ recRecipes: [], otherRecipes: [] });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // TODO: using JSONs for testing purposes
  // note to self, switch this out for the database interaction and send back whatever was grabbed from the DB instead
  getRecipes(require('./testRecipes.json'), require('./testFridge.json'));
});

// POST route for saved recipes page
// All the recipes on this page are already saved in the user's saved recipes list
// When user clicks the star button on a recipe card, it will remove it from the user's saved recipes list
app.post('/savedrecipes', passport.authenticate("jwt", { session: false }), (req, res) => {
  // Database interaction that removes the recipe from the user's saved recipes list
  async function unsaveRecipe() {
    console.log('Unsaving the recipe: ' + req.body.recipeName);
    try {
      await Recipe.findOneAndDelete({user: req.user._id, id: req.body.id});
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
});

// GET route for choose from saved recipes page
app.get('/choosesavedrecipes', (req, res) => {
  async function getRecipes(recipesUrl, fridgeUrl) {
    try {
      const recipes = await axios(recipesUrl);
      // TODO: database interaction here that gets the data of what's in the fridge - for now I'm using mockaroo
      // that is, the second parameter of this async function should be able to be removed in the next sprint
      const fridge = await axios(fridgeUrl);
      console.log(fridge.data);
      res.json({ recipes: recipes.data, fridge: fridge.data });
    } catch (err) {
      console.log(err);
    }
  }

  getRecipes(
    'https://my.api.mockaroo.com/recipe.json?key=8198c2b0',
    'https://my.api.mockaroo.com/fridge.json?key=8198c2b0'
  );
});

// POST route for choose from saved recipes page
app.post('/choosesavedrecipes', (req, res) => {
  // TODO
  // This route should do a database interaction where the id of the recipe that was clicked on gets added to the user's meal plan in the database
});

// GET route for add your own recipes page
app.get('/addpage', (req, res) => {
  // No data is needed for this page.
});

// POST route for add your own recipes page
app.post('/addpage', (req, res) => {
  // TODO
});

// GET route for account page
app.get('/account', async (req, res) => {
  try {
    const { userID } = req.params;
    const response = await axios.get(
      'https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0'
    );
    const person = response.data;
    res.json(person);
  } catch (error) {
    console.error(error);
    res.status(500).send('Could not retrieve user');
  }
});

// POST route for account page
app.post('/account', (req, res) => {
  // Change this user's budget
  if (req.body.budget && !isNaN(req.body.budget)) {
    // Make sure budget is a number
    // TODO: database interaction here that updates the user's budget in the database
    const budgetNumber = Number(req.body.budget).toFixed(2);
    res.json({ budget: '$' + budgetNumber });
  } else {
    // Invalid input
    res.status(400);
    res.json({ msg: 'invalid input' });
  }
});

// GET route for my fridge page
app.get('/myfridge', (req, res) => {
  // This method will later be populated with code that retrieves the user's fridge items from the database.
  // Will be implemented in sprint 3
  res.send(req.body);
});

// GET route for my grocery list page
app.get('/mygrocerylist', (req, res) => {
  // This method will later be populated with code that retrieves the user's grocery list items from the database.
  // Will be implemented with database in sprint 3
  res.send(req.body);
});

app.post('/myfridge', (req, res) => {
  // This method will later be populated with code that adds an ingredient into the user's fridge in the database
  // Will be implemented with database in sprint 3
  res.send(req.body);
});

app.post('/mygrocerylist', (req, res) => {
  // This method will later be populated with code that adds an ingredient into the user's grocery list in the database
  // Will be implemented with database in sprint 3
  res.send(req.body);
});

// Export the express app
module.exports = app;
