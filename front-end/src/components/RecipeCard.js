import React from 'react';
import './RecipeCard.css';

const RecipeCard = (props) => {
    // Return the final component, consisting of the recipe name, image, and the list of ingredients
    return (
        <div className="recipe">
          <h2>{props.recipeDetails.recipeName}</h2>
          <img src={props.recipeDetails.image} alt={props.recipeDetails.recipeName} />
          <IngredientsList ingredients = {props.recipeDetails.ingredients}/>
        </div>
    );
}

// Component for the list of ingredients that will be displayed on a recipe card
const IngredientsList = (props) => {
    // Turn the fetched JSON array of ingredients into an array of components, each component representing a single ingredient
    const ingredientsList = props.ingredients.map((ingredient, k) => {
        return (<div key={k} className="ingredient">
            <li>{ingredient.ingredientName}</li>
            <li>{ingredient.ppu}</li>
        </div>);
    });

    // Return the array of ingredients
    return (
        <>
            {ingredientsList}
        </>
    );
}

export default RecipeCard;