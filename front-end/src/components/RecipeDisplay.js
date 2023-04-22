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

    // State to store card version of recommended recipes
    const [recRecipeCards, setRecRecipeCards] = useState([]);

    // State to store card version of non-recommended recipes
    const [otherRecipeCards, setOtherRecipeCards] = useState([]);

    // On the first render, make an API call to the backend, to fetch the recipe data from the database
    useEffect(() => {
        async function getRecipes(url) {
            try {
                const response = await axios(url);
                setRecRecipes(response.data.recRecipes);
                setOtherRecipes(response.data.otherRecipes);
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
    // Citation - code is based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
    const filterRecipes = (query, recRecipeCards, otherRecipeCards) => {
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
            const allRecipeCards = [...recRecipeCards, ...otherRecipeCards];
            return allRecipeCards.filter((recipeCard) => {
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
            { filterRecipes(searchQuery, recRecipeCards, otherRecipeCards) }
        </div>
        </>
    );
}

export default RecipeDisplay;