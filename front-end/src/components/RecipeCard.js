import React from 'react';
import axios from 'axios';
import { IconContext } from "react-icons";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import './RecipeCard.css';
import {Modal, Box, List, ListItemText, Button, IconButton, Divider} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RecipeCard = (props) => {
    // Calculate the total price of this recipe, based on the ingredients
    const totalPrice = props.recipeDetails.ingredients.reduce((price, curr) => {
        // TODO testing here
        console.log("ppu:", curr.ppu);
        console.log("units:", curr.units);

        return price + (curr.ppu * curr.units);
    }, 0).toFixed(2);

    // Function to run when the star button is clicked on this recipe card
    let onClick;
    if (!props.recipeDetails.saved) { // Save a recipe
        onClick = (e) => {
            const url = process.env.REACT_APP_SERVER_HOSTNAME + '/' + props.route;
            // Send a post request to the server, indicating that it should add this recipe to the user's saved recipes list in the database
            try {
                axios.post(url, {
                    save: true,
                    recipeName: props.recipeDetails.recipeName,
                })
            } catch (err) {
                console.log(err);
            }
        }
    } else { // Unsave a recipe
        onClick = (e) => {
            const url = process.env.REACT_APP_SERVER_HOSTNAME + '/' + props.route;
            // Send a post request to the server, indicating that it should remove this recipe from the user's saved recipes list in the database
            try {
                axios.post(url, {
                    save: false,
                    recipeName: props.recipeDetails.recipeName,
                })
            } catch (err) {
                console.log(err);
            }
        }
    }

    // Star icon - fill if this recipe is favorited, outline if not
    const starIcon = props.recipeDetails.saved ? <AiFillStar /> : <AiOutlineStar />

    // for modal implementation for details
    const [open, setOpen] = React.useState(false);
    const detailOnClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const ingredients = []
    for (let i in props.recipeDetails.ingredients) {
        ingredients.push(<li>{props.recipeDetails.ingredients[i].ingredientName}</li>)
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
                    <h1>{props.recipeDetails.recipeName}</h1>
                    <img src={props.recipeDetails.image} alt="aa"></img>
                    <Divider variant="middle" />
                    <h2>Ingredients</h2>
                    <List>
                        <ListItemText primary={ingredients}/>
                    </List>
                    <Divider variant="middle" />
                    <h2>Instructions</h2>
                    <p>{props.recipeDetails.instructions}</p>
                    <Divider variant="middle" />
                    <Button variant="contained" onClick={onClick} sx={{margin: '1%'}}>Save Recipe</Button>
                </Box>
            </Modal>
            <h1 className="recipeName">{props.recipeDetails.recipeName}</h1>
            <h2 className="totalPrice">${totalPrice}</h2>
        </div>
    );
}

export default RecipeCard;