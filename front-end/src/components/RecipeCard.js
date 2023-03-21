import React from 'react';
import { IconContext } from "react-icons";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import './RecipeCard.css';
import { useNavigate } from 'react-router-dom';

const RecipeCard = (props) => {
    // Calculate the total price of this recipe, based on the ingredients
    const totalPrice = props.recipeDetails.ingredients.reduce((price, curr) => {
        return price + (curr.ppu * curr.units);
    }, 0).toFixed(2);

    // Function to run when the star button is clicked on this recipe card
    let onClick;
    if (!props.recipeDetails.favorite) { // favorite
        onClick = (e) => {
            // TODO: add this recipe to the user's favorites in the database
            console.log("favorite!");
        }
    } else { // unfavorite
        onClick = (e) => {
            // TODO: remove this recipe from the user's favorites in the database
            console.log("unfavorite!");
        }
    }

    // Star icon - fill if this recipe is favorited, outline if not
    const starIcon = props.recipeDetails.favorite ? <AiFillStar /> : <AiOutlineStar />

    const navigate = useNavigate()

    const detailOnClick = (e) => {
        // adding scuffed popup implementation for details
        navigate('/details', {state:{details:props.recipeDetails}})
    }

    // Return the final component, consisting of the recipe name, image, and the list of ingredients
    return (
        <div className="recipeCard">
            <div className="relative">
                <button onClick={onClick} className="button">
                    <IconContext.Provider value={{ className: "star" }}>
                        <div>{starIcon}</div>
                    </IconContext.Provider>
                </button>
            </div>
            <img src={props.recipeDetails.image} alt={props.recipeDetails.recipeName} className="recipeImg" onClick={detailOnClick}/>
            <h1 className="recipeName">{props.recipeDetails.recipeName}</h1>
            <h2 className="totalPrice">${totalPrice}</h2>
        </div>
    );
}

export default RecipeCard;