import React, {useState} from 'react';
import { IconContext } from "react-icons";
import { AiFillEdit, AiOutlineStar, AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {Modal, Box, List, ListItemText, Button, IconButton, Divider} from '@mui/material';
import './RecipeCard.css';
import './MealCard.css';
import CloseIcon from '@mui/icons-material/Close';

const MealCard = (props) => {
    // for modal implementation for details
    const [open, setOpen] = React.useState(false);
    const detailOnClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const ingredients = [];
    for (let i in props.ingredients) {
        ingredients.push(<li>{props.ingredients[i].ingredientString}</li>);
    }

    let content;
    if (props.noSelection) {
        content = <p className="defaultText">No recipe selected</p>;
    } else {
        content = <div className="content"><img className="recipeImage" src={props.src} alt={props.recipeName} onClick={detailOnClick} /><p className="recipeTitle">{props.recipeName}</p><h3 className="recipeCost">${props.cost}</h3></div>
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
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        backgroundColor: 'white',
                        height: '90%',
                        margin: '4%',
                        padding: '1%',
                        overflow: 'hidden',
                        overflowY: "auto",
                    }}
                >
                    <IconButton onClick={handleClose} sx={{float: "right"}}>
                        <CloseIcon />
                    </IconButton>
                    <div className="center">
                        <img src={props.src} alt={props.recipeName} className="detailsImage"></img>
                    </div>
                    <h2 className="detailsTitle">{props.recipeName}</h2>
                    <h4 className="detailsHeader">Ingredients</h4>
                    <List>
                        <ListItemText className="detailsText" primary={ingredients}/>
                    </List>
                    <Divider variant="middle" />
                    <h4 className="detailsHeader">Instructions</h4>
                    <p className="detailsText">{props.instructions}</p>
                </Box>
            </Modal>
        </div>
    );
}

export default MealCard;