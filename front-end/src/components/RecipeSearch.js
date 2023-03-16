import React from 'react';
import RecipeDisplay from './RecipeDisplay.js';
import './RecipeSearch.css';

const RecipeSearch = () => {
    return (
        <>
        <h1>Recipe Search</h1>
        <div>
            <RecipeDisplay apiLink = 'https://my.api.mockaroo.com/recipe.json?key=8198c2b0' />
        </div>
        </>
    );
}

export default RecipeSearch;