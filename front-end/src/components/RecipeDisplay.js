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

    // State to store recommended recipes
    const [recRecipes, setRecRecipes] = useState([]);

    // State to store other non-recommended recipes
    const [otherRecipes, setOtherRecipes] = useState([]);

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
    }, [recipes, fridge]);

    // Function to sort the recipes state array to start with the recommended recipes first
    // Argument is the user's fridge - recipes that use ingredients in the fridge will be recommended
    const sortRecipes = (recipes, fridge) => {
        console.log("sorting recipes..."); // TODO
        console.log("fridge:", fridge);
        console.log("recipes:", recipes);
        const fridgeIngNames = fridge.ingredients.map(ing => ing.ingredientName);
        recipes.forEach((recipe) => {
            // Recommend this recipe if its ingredients match ingredient(s) in the fridge
            console.log("recipe ings:", recipe.ingredients);
            console.log("fridge ings:", fridgeIngNames);
            console.log("result:", ingredientMatch(recipe.ingredients, fridgeIngNames));
            if (ingredientMatch(recipe.ingredients, fridgeIngNames)) {
                console.log("HERE 1");
                setRecRecipes([...recRecipes, recipe]);
            }
            // Don't recommend if no ingredients are in the fridge
            else {
                console.log("HERE 2");
                setOtherRecipes([...otherRecipes, recipe]);
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
                console.log('found a match');
                result = true;
                return false;
            }
        });
        return result;
    }

    /*
    // Make the fetched array of recipes into an array of recipe cards - all recipes
    const recipeCards = recipes.map(recipe => {
        return (
            <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />
        );
    })
    */

    useEffect(() => {
        // Make an array of recipe cards that's just the recommended
        setRecRecipeCards(recRecipes.map(recipe => {
            return (
                <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />
            );
        }));

        // Make an array of recipe cards that's just the non-recommended
        setOtherRecipeCards(otherRecipes.map(recipe => {
            return (
                <RecipeCard key={recipe.id} recipeDetails={recipe} route={props.route} />
            );
        }));
        console.log("rec recipes:", recRecipes);
        console.log("other recipes:", otherRecipes);
    }, [recRecipes, otherRecipes]);

    // Update all recipe cards whenever the recommended and other recipe cards are updated
    useEffect(() => {
        // Make an array of all recipe cards that's just the other two arrays put together
        setAllRecipeCards([...recRecipeCards, ...otherRecipeCards]);
    }, [recRecipeCards, otherRecipeCards]);

    // Search bar functionality
    // Citation - code is based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
    const filterRecipes = (query, recRecipeCards, otherRecipeCards, allRecipeCards) => {
        if (!query) {
            return <div>
                <h3 className="recommendedText">Recommended</h3>
                <div>{recRecipeCards}</div>
                <hr/>
                <div>{otherRecipeCards}</div>
            </div>
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