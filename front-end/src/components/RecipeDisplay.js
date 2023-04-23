import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeDisplay.css';
import RecipeCard from './RecipeCard.js';
import SearchBar from './SearchBar.js';

const RecipeDisplay = (props) => {

    // State to store user input in the search bar
    const [searchQuery, setSearchQuery] = useState('');
    
    // State to store all the recommended recipes fetched from the database
    const [recRecipes, setRecRecipes] = useState([]);

    // State to store all the non-recommended recipes fetched from the database
    const [otherRecipes, setOtherRecipes] = useState([]);

    // State to store recipes that come up as search results
    const [searchResults, setSearchResults] = useState([]);

    // State to store card version of recommended recipes
    const [recRecipeCards, setRecRecipeCards] = useState([]);

    // State to store card version of non-recommended recipes
    const [otherRecipeCards, setOtherRecipeCards] = useState([]);

    // On the first render, make an API call to the backend, to fetch the recipe data from the database
    useEffect(() => {
        async function getRecipes(url) {
            try {
                // for authentication purposes
                const jwtToken = localStorage.getItem("token")
                const authToken = 'jwt ' + jwtToken + ''
                const response = await axios(url, {headers: { Authorization: authToken }});
                // Search results version of the page, after user uses search bar
                if (response.data.searchResults) {
                    setSearchResults(response.data.searchResults);
                }
                // Default version of the page, before user uses search bar
                else {
                    setRecRecipes(response.data.recRecipes);
                    setOtherRecipes(response.data.otherRecipes);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getRecipes(props.apiLink);
    }, [props.apiLink]);

    // Create recipe cards for the recommended and other recipes
    useEffect(() => {
        setRecRecipeCards(recRecipes.map((recipe) => {
            return <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />
        }));
        setOtherRecipeCards(otherRecipes.map((recipe) => {
            return <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />
        }));
    }, [recRecipes, otherRecipes, props.route]);

    // Search bar functionality
    // Citation - code is partially based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
    const filterRecipes = (query) => {
        if (!query && recRecipeCards.length === 0) {
            return otherRecipeCards;
        }
        else if (!query) {
            return <>
                <h3 className="titleText">Recommended</h3>
                {recRecipeCards}
                <h3 className="titleText">More Recipes</h3>
                {otherRecipeCards}
            </>
        } else {
            // On the /savedrecipes route, display all saved recipes that match the query - no need to go to back end
            if (props.route === 'savedrecipes') {
                const allRecipeCards = [...recRecipeCards, ...otherRecipeCards];
                return allRecipeCards.filter((recipeCard) => {
                    return recipeCard.props.recipeDetails.recipeName.toLowerCase().includes(query);
                });
            }
            // On the /recipesearch route, display the recipes from the API that match the search query
            else {
                const searchResultsCards = searchResults.map((recipe) => {
                    return <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />
                });
                return searchResultsCards;
            }
        }
    };

    // Return the final component, consisting of page header and the array of recipe cards
    return (
        <>
        <div className="searchBar">
            <SearchBar route={props.route} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchResults={setSearchResults} />
        </div>
        <div className="recipes">
            { filterRecipes(searchQuery) }
        </div>
        </>
    );
}

export default RecipeDisplay;