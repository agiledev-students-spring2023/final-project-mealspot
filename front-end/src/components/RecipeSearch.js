import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeSearch.css';
import RecipeCard from './RecipeCard.js';
import SearchBar from './SearchBar.js';

const RecipeSearch = () => {
    // State to store the recipes fetched from the database
    const [recipes, setRecipes] = useState([]);

    // State to store user input in the search bar
    const [searchQuery, setSearchQuery] = useState("");

    // On the first render, make an API call to the backend, to fetch the recipe data from the database
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

    // Search bar functionality
    // Citation - code is based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
    const filterData = (query, data) => {
        if (!query) {
          return data;
        } else {
          return data.filter((d) => d.toLowerCase().includes(query));
        }
    };

    // Return the final component, consisting of page header and the array of recipe cards
    return (
        <>
        <h1>Recipe Search</h1>
        <div className="searchBar">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className="recipes">
            {filterData(searchQuery, recipeCards)}
        </div>
        </>
    );
}

export default RecipeSearch;