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

// GET route for recipe search page
app.get("/recipesearch", (req, res) => {
    // TODO: add logic for recommended recipes
    async function getRecipes(url) {
        try {
            const response = await axios(url)
            res.json(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    getRecipes('https://my.api.mockaroo.com/recipe.json?key=8198c2b0');
})

// POST route for recipe search page
// When user clicks the star button on a recipe card, it will save the recipe to the user's saved recipe list if it isn't saved yet
// ...or it will remove it from the user's saved recipe list if it is already on it
app.post("/recipesearch", (req, res) => {
    // Save a recipe
    if (req.body.save) {
        // TODO: database interaction here that saves the recipe to the user's saved recipes list
        console.log("Saving the recipe: " + req.body.recipeName)
    } // Unsave a recipe
    else {
        // TODO: database interaction here that removes the recipe from the user's saved recipes list
        console.log("Unsaving the recipe: " + req.body.recipeName)
    }
    return res.json({
        status: 'ok',
    })
})

app.post("/login", (req, res) => {
    console.log(req.body);
    res.end('success')
})

app.post("/register", (req, res) => {
    console.log(req.body);
    res.end('success')
})

// GET route for saved recipes page
app.get("/savedrecipes", (req, res) => {
    async function getRecipes(url) {
        try {
            const response = await axios(url)
            res.json(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    getRecipes('https://my.api.mockaroo.com/recipe.json?key=8198c2b0');
})

// POST route for saved recipes page
// All the recipes on this page are already saved in the user's saved recipes list
// When user clicks the star button on a recipe card, it will remove it from the user's saved recipes list
app.post("/savedrecipes", (req, res) => {
    // Unsave a recipe
    if (!req.body.save) { // Should always be true
        // TODO: database interaction here that removes the recipe from the user's saved recipes list
        console.log("Unsaving the recipe: " + req.body.recipeName)
    }
    return res.json({
        status: 'ok',
    })
})

// GET route for my fridge page
app.get("/myfridge", (req, res) => {

})

// GET route for my grocery list page
app.get("/mygrocerylist", (req, res) => {

})

// Export the express app
module.exports = app