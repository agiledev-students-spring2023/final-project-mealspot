import React from 'react';
import RecipeDisplay from './RecipeDisplay.js';
import './SavedRecipes.css';

const SavedRecipes = () => {
    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/savedrecipes`;

    // Return the final component, consisting of page header and the array of recipe cards
    return (
        <>
        <h1>Saved Recipes</h1>
        <div>
            <RecipeDisplay route='savedrecipes' apiLink={apiLink} />
        </div>
        </>
    );
}

export default SavedRecipes;