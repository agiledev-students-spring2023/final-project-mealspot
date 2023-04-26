import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './SavedRecipes.js';
import './RecipeDisplay.css';
import RecipeCard from './RecipeCard.js';
import SearchBar from './SearchBar.js';
import { Navigate } from "react-router-dom"

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

    // Use data from parent component's context
    const data = useContext(DataContext);

    // On the first render, make an API call to the backend, to fetch the recipe data from the database
    useEffect(() => {
        // Search results version of the page, after user uses search bar
        if (data.searchResults) {
            setSearchResults(data.searchResults);
        }
        // Default version of the page, before user uses search bar
        else {
        setRecRecipes(data.recRecipes);
        setOtherRecipes(data.otherRecipes);
        }
    }, [data]);

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

    // redirect if not logged in
    const jwtToken = localStorage.getItem("token")
    if (!jwtToken) {
        console.log("user not logged in")
        return <Navigate to="/login" />
    }

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