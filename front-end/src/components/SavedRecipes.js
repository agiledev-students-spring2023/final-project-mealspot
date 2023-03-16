import React from 'react';
import RecipeDisplay from './RecipeDisplay.js';
import './SavedRecipes.css';

const SavedRecipes = () => {
    // Return the final component, consisting of page header and the array of recipe cards
    return (
        <>
        <h1>Saved Recipes</h1>
        <div>
            <RecipeDisplay apiLink='https://my.api.mockaroo.com/recipe.json?key=8198c2b0' />
        </div>
        </>
    );
}

export default SavedRecipes;