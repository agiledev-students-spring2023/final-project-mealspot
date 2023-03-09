import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SavedRecipes.css';
import RecipeCard from './RecipeCard.js';

const SavedRecipes = () => {
    // State to store the recipes fetched from the database
    const [recipes, setRecipes] = useState([]);

    // On the first render, make an API call to the backend, to fetch the recipe data from the user's document
    useEffect(() => {
        async function getRecipes(url) {
            try {
                const response = await axios(url);
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getRecipes('https://my.api.mockaroo.com/recipe.json?key=8198c2b0');
    }, []);

    // Make the fetched array of recipes into an array of recipe cards
    const recipeCards = recipes.map(recipe => {
        return (
            <RecipeCard key={recipe.id} recipeDetails={recipe} />
        );
    })

    // Return the final component, consisting of page header and the array of recipe cards
    return (
        <>
        <h1>Saved Recipes</h1>
        <div className="recipes">
            {recipeCards}
        </div>
        </>
    );
}

export default SavedRecipes;