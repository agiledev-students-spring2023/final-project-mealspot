import React, {useState} from 'react';
import { IconContext } from "react-icons";
import { AiFillEdit, AiOutlineStar, AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {Modal, Box, List, ListItemText, Button, IconButton, Divider} from '@mui/material';
import './RecipeCard.css';
import './MealCard.css';
import CloseIcon from '@mui/icons-material/Close';

const MealCard = (props) => {
    let content;
    if (props.noSelection) {
        content = <p className="defaultText">No recipe selected</p>;
    } else {
        content = <div className="content"><img className="recipeImage" src={props.src} alt={props.recipeName} /><p className="recipeTitle">{props.recipeName}</p><h3 className="recipeCost">${props.cost}</h3></div>
    }
    return (
        <div className="mealCard grayBackground">
            <h3 className="mealTitle">{props.meal}</h3>
            <Link to="/choosesavedrecipes" className="editLink" onClick={props.onClick}>
                <IconContext.Provider value={{ className: "editIcon" }}>
                    <div><AiFillEdit /></div>
                </IconContext.Provider>
            </Link>
            {content}
        </div>
    );
}

export default MealCard;