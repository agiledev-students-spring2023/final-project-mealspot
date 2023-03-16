import React from 'react';
import { IconContext } from "react-icons";
import { AiOutlineStar } from "react-icons/ai";
import './RecipeCard.css';

const RecipeCard = (props) => {
    // Calculate the total price of this recipe, based on the ingredients
    const totalPrice = props.recipeDetails.ingredients.reduce((price, curr) => {
        console.log(price);
        return price + (curr.ppu * curr.units);
    }, 0).toFixed(2);

    // Return the final component, consisting of the recipe name, image, and the list of ingredients
    return (
        <div className="recipeCard">
            <IconContext.Provider value={{ className: "star" }}>
                <div className="relative"><AiOutlineStar /></div>
            </IconContext.Provider>
            <img src={props.recipeDetails.image} alt={props.recipeDetails.recipeName} className="recipeImg" />
            <h1 className="recipeName">{props.recipeDetails.recipeName}</h1>
            <h2 className="totalPrice">${totalPrice}</h2>
        </div>
    );
}

export default RecipeCard;