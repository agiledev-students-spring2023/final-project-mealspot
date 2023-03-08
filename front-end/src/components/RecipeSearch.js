import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeSearch.css';
import RecipeCard from './RecipeCard.js';

const RecipeSearch = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(()=>{
        async function getRecipes(url) {
            try {
                const response = await axios(url);
                console.log(response.data);
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getRecipes('https://my.api.mockaroo.com/recipe.json?key=8198c2b0');
        console.log("recipes:", recipes);
    }, [recipes]);

    const recipesList = recipes.map(recipe => {
        return (
            <RecipeCard key={recipe.id} details={recipe} />
        );
    })

    return (
        <>
        <h1>recipe search page</h1>
        <div className="recipes">
            {recipesList}
        </div>
        </>
    );
}

export default RecipeSearch;