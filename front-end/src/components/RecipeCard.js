import React from 'react';
import './RecipeCard.css';

const RecipeCard = (props) => {
    return (
        <div className="recipe">
          <h2>{props.details.recipeName}</h2>
          <IngredientsList ingredients = {props.details.ingredients}/>
        </div>
    );
}

const IngredientsList = (props) => {
    const ingredientsList = props.ingredients.map((ingredient, k) => {
        return (<div key={k} className="ingredient">
            <li>{ingredient.ingredientName}</li>
            <li>{ingredient.ppu}</li>
        </div>);
    });

    return (
        <>
            {ingredientsList}
        </>
    );
}

export default RecipeCard;