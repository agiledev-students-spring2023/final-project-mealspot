import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import RecipeDisplay from './RecipeDisplay.js';
import './ChooseSavedRecipes.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const ChooseSavedRecipes = () => {
     // State to store data fetched from the back-end
     const [data, setData] = useState({});
     // State to indicate whether we are still waiting on the data fetch
     const [isLoading, setLoading] = useState(true);
 
     const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/choosesavedrecipes`;
 
     // Pull the saved recipes from the database
     useEffect(() => {
         async function getRecipes(url) {
             try {
                 // for authentication purposes
                 const jwtToken = localStorage.getItem("token")
                 const authToken = 'jwt ' + jwtToken + ''
                 const response = await axios(url, {headers: { Authorization: authToken }});
                 // Set the data state to the JSON data axios GETs from the back-end
                 setData(response.data);
                 setLoading(false);
             } catch (err) {
                 console.log(err);
             }
         }
         getRecipes(apiLink);
     }, [apiLink]);
 
     // Return the final component, consisting of page header and the array of recipe cards
     if (isLoading) {
         return (
             <>
             <h2 className='loadingText'>Loading...</h2>
             </>
         );
     } else {
         return (
        <div className = "popup"> 
            <div>
                <Link to="/" className="link-edit">
                    <IconContext.Provider value={{ className: "navbar-icon" }}>
                        <div><AiFillCloseCircle /></div>
                 </IconContext.Provider>
                </Link>
            </div>
            <div className="popupInner">
                <h1>Edit Meal</h1>
                <p className='choose'>Choose From Saved</p>
                <div>
                    {/* <RecipeDisplay apiLink='https://my.api.mockaroo.com/recipe.json?key=8198c2b0' /> */}
                    <RecipeDisplay route='choosesavedrecipes' data={data} />
                 </div>
            </div>
        </div>
    );
     }
}

export default ChooseSavedRecipes;