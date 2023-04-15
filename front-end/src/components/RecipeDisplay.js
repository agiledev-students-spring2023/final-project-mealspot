import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeDisplay.css';
import RecipeCard from './RecipeCard.js';
import SearchBar from './SearchBar.js';

const RecipeDisplay = (props) => {
    // State to store the fridge ingredients fetched from the database
    const [fridge, setFridge] = useState({});

    // State to store user input in the search bar
    const [searchQuery, setSearchQuery] = useState("");
    
    // State to store all the recipes fetched from the database
    const [recipes, setRecipes] = useState([]);

    // State to store card version of all recipes
    const [allRecipeCards, setAllRecipeCards] = useState([]);

    // State to store card version of recommended recipes
    const [recRecipeCards, setRecRecipeCards] = useState([]);

    // State to store card version of non-recommended recipes
    const [otherRecipeCards, setOtherRecipeCards] = useState([]);

    // On the first render, make an API call to the backend, to fetch the recipe data from the database
    useEffect(() => {
        async function getRecipes(url) {
            try {
                const response = await axios(url);
                setRecipes(response.data.recipes);
                setFridge(response.data.fridge);
            } catch (err) {
                console.log(err);
            }
        }

        getRecipes(props.apiLink);
    }, [props.apiLink]);
    // TODO: the page should update whenever the data in the database is changed

    // Anytime recipes or fridge is changed, find the recipes to recommend
    useEffect(() => {
        if (Object.keys(fridge).length !== 0 && recipes.length !== 0) {
            sortRecipes(recipes, fridge);
        }
        // Clean-up function that resets the cards, so it doesn't re-add cards that are already on the page
        return () => { setRecRecipeCards([]); setOtherRecipeCards([]); setAllRecipeCards([]); }
    }, [recipes, fridge]);

    // Update all recipe cards whenever the recommended and other recipe cards are updated
    useEffect(() => {
        // Make an array of all recipe cards that's just the other two arrays put together
        setAllRecipeCards([...recRecipeCards, ...otherRecipeCards]);
    }, [recRecipeCards, otherRecipeCards]);

    // Function to sort the recipes state array to start with the recommended recipes first
    // Argument is the user's fridge - recipes that use ingredients in the fridge will be recommended
    const sortRecipes = (recipes, fridge) => {
        const fridgeIngNames = fridge.ingredients.map(ing => ing.ingredientName);
        recipes.forEach((recipe) => {
            // Recommend this recipe if its ingredients match ingredient(s) in the fridge
            if (ingredientMatch(recipe.ingredients, fridgeIngNames)) {
                // Add to an an array of recipe cards that's just the recommended
                setRecRecipeCards((recRecipeCards) => [...recRecipeCards, <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />]);
            }
            // Don't recommend if none of this recipe's ingredients are in the fridge
            else {
                // Add to an array of non-recommended recipe cards
                setOtherRecipeCards((otherRecipeCards) => [...otherRecipeCards, <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />]);
            }
        });
    }

    // Helper function for sortRecipes that checks if there are matching ingredients in recipe and fridge
    // Parameters are the ingredients (array of objects) of the recipe
    // And the names of the ingredients in the fridge
    const ingredientMatch = (recipeIngs, fridgeIngNames) => {
        let result = false;
        recipeIngs.forEach((ing) => {
            if (fridgeIngNames.includes(ing.ingredientName)) {
                result = true;
                return false;
            }
        });
        return result;
    }

    // Search bar functionality
    // Citation - code is based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
    const filterRecipes = (query, recRecipeCards, otherRecipeCards, allRecipeCards) => {
        if (!query && recRecipeCards.length === 0) {
            return allRecipeCards;
        }
        else if (!query) {
            return <>
                    <h3 className="titleText">Recommended</h3>
                    {recRecipeCards}
                    <h3 className="titleText">More Recipes</h3>
                    {otherRecipeCards}
                </>
        } else {
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
            { filterRecipes(searchQuery, recRecipeCards, otherRecipeCards, allRecipeCards) }
        </div>
        </>
    );
}

export default RecipeDisplay;