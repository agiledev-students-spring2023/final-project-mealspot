import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconContext } from "react-icons";
import { BsXCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import RecipeDisplay from './RecipeDisplay.js';
import './ChooseSavedRecipes.css';
import { CircularProgress } from '@mui/material';

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
     //backbutton exits edit page and returns user to mealplan page 
     if (isLoading) {
        return (
            <div> 
                <div>
                    <Link to="/" className="backButton"> 
                        <IconContext.Provider value={{ className: "backIcon" }}>
                            <div><BsXCircleFill /></div>
                        </IconContext.Provider>
                    </Link>
                </div>
                <div className="popupInner">
                    <h1>Edit Meal</h1>
                    <div>
                        <div className='loadingSpinner'><CircularProgress /></div>
                    </div>
                </div>
            </div>
        );
     } else {
        return (
        <div> 
            <div>
                <Link to="/" className="backButton">
                    <IconContext.Provider value={{ className: "backIcon" }}>
                        {/* <div><BsFillArrowLeftCircleFill /></div> */}
                        <div><BsXCircleFill /></div>
                    </IconContext.Provider>
                </Link>
            </div>
            <div className="popupInner">
                <h1>Edit Meal</h1>
                <div>
                    <RecipeDisplay route='choosesavedrecipes' data={data} />
                 </div>
            </div>
        </div>
    );
     }
}

export default ChooseSavedRecipes;