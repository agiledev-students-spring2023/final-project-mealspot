import React, {useState} from 'react';
import axios from 'axios';
import { IconContext } from "react-icons";
import { AiOutlineStar, AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import './RecipeCard.css';
import {Modal, Box, List, ListItemText, Button, IconButton, Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const RecipeCard = (props) => {
    // State for whether the recipe on this card is saved or not
    const [saved, setSaved] = useState(props.recipeDetails.saved);

    // for authenticated users
    const jwtToken = localStorage.getItem("token")
    const authToken = 'jwt ' + jwtToken + ''

    // Function to run when the star button is clicked on this recipe card
    let onClick;
    let buttonText;
    const navigate = useNavigate();
    if (!saved) { // Save a recipe
        onClick = async(e) => {
            const url = process.env.REACT_APP_SERVER_HOSTNAME + '/' + props.route;
            // Send a post request to the server, indicating that it should add this recipe to the user's saved recipes list in the database
            try {
                await axios.post(url, {
                    save: true,
                    recipeName: props.recipeDetails.recipeName,
                    id: props.recipeDetails.id,
                }, {headers: { Authorization: authToken }});
                if (props.route === 'savedrecipes') {
                    window.location.reload(false);
                } else {
                    setSaved(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
        buttonText = 'Save Recipe';
    } else { // Unsave a recipe
        if (props.route === 'choosesavedrecipes') {
            onClick = (e) => {
                const url = process.env.REACT_APP_SERVER_HOSTNAME + '/' + props.route;
                // Send a post request to the server, indicating that it should add this recipe to the user's saved recipes list in the database
                try {
                    axios.post(url, {
                        recipeName: props.recipeDetails.recipeName,
                        id: props.recipeDetails.id,
                    }, {headers: { Authorization: authToken }})
                    navigate('/login');
                } catch (err) {
                    console.log(err);
                }
            }
            buttonText = 'Choose Recipe';
        }
        else
        {
            onClick = async(e) => {
            const url = process.env.REACT_APP_SERVER_HOSTNAME + '/' + props.route;
            // Send a post request to the server, indicating that it should remove this recipe from the user's saved recipes list in the database
            try {
                await axios.post(url, {
                    save: false,
                    recipeName: props.recipeDetails.recipeName,
                    id: props.recipeDetails.id,
                }, {headers: { Authorization: authToken }});
                if (props.route === 'savedrecipes') {
                    window.location.reload(false);
                } else {
                    setSaved(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        buttonText = 'Unsave Recipe';
    }
}

    // Star icon - fill if this recipe is favorited, outline if not
    let starIcon = saved ? <AiFillStar /> : <AiOutlineStar />;
    if (props.route === 'choosesavedrecipes') {
        starIcon = <AiOutlinePlusCircle />;
    }

    // for modal implementation for details
    const [open, setOpen] = React.useState(false);
    const detailOnClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const ingredients = [];
    for (let i in props.recipeDetails.ingredients) {
        ingredients.push(<li>{props.recipeDetails.ingredients[i].ingredientString}</li>);
    }

    // Return the final component, consisting of the recipe name, image, and the list of ingredients
    return (
        <div className="recipeCard grayBackground">
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
                    <div className="center">
                        <img src={props.recipeDetails.image} alt={props.recipeDetails.recipeName} className="detailsImage"></img>
                    </div>
                    <h2 className="detailsTitle">{props.recipeDetails.recipeName}</h2>
                    <div className="center">
                        <Button variant="contained" onClick={onClick} sx={{margin: '1%'}}>{buttonText}</Button>
                    </div>
                    <h4 className="detailsHeader">Ingredients</h4>
                    <List>
                        <ListItemText className="detailsText" primary={ingredients}/>
                    </List>
                    <Divider variant="middle" />
                    <h4 className="detailsHeader">Instructions</h4>
                    <p className="detailsText">{props.recipeDetails.instructions}</p>
                </Box>
            </Modal>
            <h2 className="recipeName">{props.recipeDetails.recipeName}</h2>
            <h2 className="totalPrice">${props.recipeDetails.price}</h2>
        </div>
    );
}

export default RecipeCard;