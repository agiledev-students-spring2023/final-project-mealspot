import React from 'react';
import RecipeDisplay from './RecipeDisplay.js';
import './RecipeSearch.css';

const RecipeSearch = () => {
    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/recipesearch`;

    return (
        <>
        <h1>Recipe Search</h1>
        <div>
            <RecipeDisplay route='recipesearch' apiLink={apiLink} />
        </div>
        </>
    );
}

export default RecipeSearch;