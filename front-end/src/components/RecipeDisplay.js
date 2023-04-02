import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeDisplay.css';
import RecipeCard from './RecipeCard.js';
import SearchBar from './SearchBar.js';

const RecipeDisplay = (props) => {
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

        getRecipes(props.apiLink);
    }, [props.apiLink]);
    // TODO: the page should update whenever the data in the database is changed

    // Make the fetched array of recipes into an array of recipe cards
    const recipeCards = recipes.map(recipe => {
        return (
            <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />
        );
    })

    // Search bar functionality
    // Citation - code is based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
    const filterRecipes = (query, recipeData) => {
        if (!query) {
            return recipeData;
        } else {
            return recipeData.filter((recipeCard) => {
                return recipeCard.props.recipeDetails.recipeName.toLowerCase().includes(query);
            });
        }
    };

    // Return the final component, consisting of page header and the array of recipe cards
    return (
        <>
        <div className="searchBar">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className="recipes">
            { filterRecipes(searchQuery, recipeCards) }
        </div>
        </>
    );
}

export default RecipeDisplay;