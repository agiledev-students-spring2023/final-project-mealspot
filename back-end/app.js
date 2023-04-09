// Import and instantiate an express object
const express = require("express")
const app = express()

// Middleware imports
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware to enable cross-origin resource sharing requests


// Use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// Use CORS middleware
app.use(cors());

// Use Express body parsing middleware
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// GET route for recipe homepage
app.get("/", (req, res) => {
    async function getRecipes(url) {
        try {
            const response = await axios(url)
            res.json(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    getRecipes('https://my.api.mockaroo.com/recipe.json?key=cf37bb40')
})

// POST route for recipe homepage days of the week form
app.post("/", (req, res) => {
    // Unsave a recipe
    console.log("Selected day: " + req.body.day)
    const day = parseInt(req.body.day);
    if (isNaN(day) || day < 0 || day > 6) {
        return res.status(400).json({
            status: 'error',
        })
    }
    return res.json({
        status: 'ok',
    })
})

// GET route for homepage recipe edit page
app.get("/choosepage", (req, res) => {
    //change later
    res.send(req.body)
})

app.get("/", (req, res) => {
    res.send("Hello")
})

app.post("/login", (req, res) => {
    console.log(req.body);
    res.end('success')
})

app.post("/register", (req, res) => {
    console.log(req.body);
    res.end('success')
})

// GET route for recipe search page
app.get("/recipesearch", (req, res) => {
    async function getRecipes(recipesUrl, fridgeUrl) {
        try {
            const recipes = await axios(recipesUrl)
            // TODO: database interaction here that gets the data of what's in the fridge - for now I'm using mockaroo
            // that is, the second parameter of this async function should be able to be removed in the next sprint
            const fridge = await axios(fridgeUrl)
            res.json({ recipes: recipes.data, fridge: fridge.data })
        } catch (err) {
            console.log(err)
        }
    }
    
    getRecipes('https://my.api.mockaroo.com/recipe.json?key=8198c2b0', 'https://my.api.mockaroo.com/fridge.json?key=8198c2b0');
})

// POST route for recipe search page
// When user clicks the star button on a recipe card, it will save the recipe to the user's saved recipe list if it isn't saved yet
// ...or it will remove it from the user's saved recipe list if it is already on it
app.post("/recipesearch", (req, res) => {
    // Save a recipe
    if (req.body.save === true) {
        // TODO: database interaction here that saves the recipe to the user's saved recipes list
        console.log("Saving the recipe: " + req.body.recipeName)
        res.json({result: "recipe saved"})
    } // Unsave a recipe
    else if (req.body.save === false) {
        // TODO: database interaction here that removes the recipe from the user's saved recipes list
        console.log("Unsaving the recipe: " + req.body.recipeName)
        res.json({result: "recipe unsaved"})
    }
    else { // Invalid input
        res.status(400)
        res.json({'msg': 'invalid input'})
    }
})

// GET route for saved recipes page
app.get("/savedrecipes", (req, res) => {
    async function getRecipes(testRecipes, testFridge) {
        try {
            //const recipes = await axios(testRecipes)
            //const fridge = await axios(testFridge)
            // TODO: database interaction here that gets the data of what's in the fridge - for now I'm using some local JSON files I wrote
            // I need the custom JSONs in order to test that the recommendation feature is working properly
            // note to self, switch this out for the database interaction and send back whatever was grabbed from the DB instead
            res.json({ recipes: testRecipes, fridge: testFridge })
        } catch (err) {
            console.log(err)
        }
    }

    getRecipes(require('./testRecipes.json'), require('./testFridge.json'));
})

// POST route for saved recipes page
// All the recipes on this page are already saved in the user's saved recipes list
// When user clicks the star button on a recipe card, it will remove it from the user's saved recipes list
app.post("/savedrecipes", (req, res) => {
    // Unsave a recipe
    if (req.body.save === false) { // Should always be true
        // TODO: database interaction here that removes the recipe from the user's saved recipes list
        console.log("Unsaving the recipe: " + req.body.recipeName)
        res.json({result: "recipe unsaved"})
    }
    else if (req.body.save === true) { // Requests from the saved recipes pages should always have save = false, because this page should only display already-saved recipes
        res.json({result: "this should not happen"})
    }
    else { // Invalid input
        res.status(400)
        res.json({'msg': 'invalid input'})
    }
})


app.get("/account", async (req, res)=> {
      try {
        const {userID} = req.params;
        const response = await axios.get("https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0");
        const person = response.data;
        res.json(person);
        console.log(res)
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not retrieve user');
    }
})


// // POST route for account page
// app.post("/account", (req, res) => {
//     // if (req.body.save) {
//     //     // TODO: database interaction here that saves the recipe to the user's saved recipes list
//     //     console.log("Saving the recipe: " + req.body.recipeName)
//     // } // Unsave a recipe
//     // else {
//     //     // TODO: database interaction here that removes the recipe from the user's saved recipes list
//     //     console.log("Unsaving the recipe: " + req.body.recipeName)
//     // }
//     return res.json({
//         status: 'ok',
//     })
// })

// GET route for my fridge page
app.get("/myfridge", (req, res) => {

})

// GET route for my grocery list page
app.get("/mygrocerylist", (req, res) => {

})

// Export the express app
module.exports = app