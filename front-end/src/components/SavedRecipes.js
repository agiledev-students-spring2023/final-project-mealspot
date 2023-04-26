import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeDisplay from './RecipeDisplay.js';
import './SavedRecipes.css';


// testing this out
const DataContext = React.createContext();

const SavedRecipes = () => {
    // State to store data fetched from the back-end
    const [data, setData] = useState({});
    // State to indicate whether we are still waiting on the data fetch
    const [isLoading, setLoading] = useState(true);

    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/savedrecipes`;

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
            <>
            <h1>Saved Recipes</h1>
            <div>
                <DataContext.Provider data={data}>
                    <RecipeDisplay route='savedrecipes' />
                </DataContext.Provider>
            </div>
            </>
        );
    }
}

export {
    SavedRecipes,
    DataContext,
}