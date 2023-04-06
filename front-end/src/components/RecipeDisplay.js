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
        let fridge;
        
        async function getRecipes(url) {
            try {
                const response = await axios(url);
                setRecipes(response.data.recipes);
                fridge = (response.data.fridge);
            } catch (err) {
                console.log(err);
            }
        }

        getRecipes(props.apiLink);
        sortRecipes(fridge); // TODO will recipes be updated at this point...?
    }, [props.apiLink]);
    // TODO: the page should update whenever the data in the database is changed

    // Function to sort the recipes state array to start with the recommended recipes first
    // Argument is the user's fridge - recipes that use ingredients in the fridge will be recommended
    const sortRecipes = (fridge) => {
        const fridgeIngNames = fridge.map(ing => ing.name);
        setRecipes(
            recipes.sort((a,b) => { // NOTE: ingredients is an array of objects
                const recommendA = ingredientMatch(a.recipeDetails.ingredients, fridgeIngNames); // TODO make sure this works
                const recommendB = ingredientMatch(b.recipeDetails.ingredients, fridgeIngNames); 
                // Both recipes should be recommended - leave them in the existing order
                if (recommendA && recommendB) {
                    return 0;
                }
                // Recommend A only - sort A before B
                else if (recommendA) {
                    return -1;
                }
                // Recommend B only - sort B before A
                else {
                    return 1;
                }
            })
        );
    }

    // Helper function for sortRecipes that checks if there are matching ingredients in recipe and fridge
    // Parameters are the ingredients (array of objects) of the recipe
    // And the names of the ingredients in the fridge
    const ingredientMatch = (recipeIngs, fridgeIngNames) => {
        recipeIngs.forEach((ing) => {
            if (fridgeIngNames.includes(ing.ingredientName)) {
                return true;
            }
        });
        return false;
    }

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