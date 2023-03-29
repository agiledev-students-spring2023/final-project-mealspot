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

// TODO: add all the routes (and custom middleware, if needed) below!
app.get("/", (req, res) => {
    res.send("Example :-)")
})

// GET route for recipe search page
app.get("/recipesearch", (req, res) => {
    async function getRecipes(url) {
        try {
            const response = await axios(url);
            res.json(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    getRecipes('https://my.api.mockaroo.com/recipe.json?key=8198c2b0');
})

// GET route for saved recipes page
app.get("/savedrecipes", (req, res) => {
    async function getRecipes(url) {
        try {
            const response = await axios(url);
            res.json(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    getRecipes('https://my.api.mockaroo.com/recipe.json?key=8198c2b0');
})

// Export the express app
module.exports = app