import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NativeSelect } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MealPlan.css';
import MealCard from './MealCard.js';
import { CircularProgress, FormControl } from '@mui/material';

//keep track of current money spent and budget, will be changed by user
let currSpent = 0
let currBudget = 0

const RecipeInfo = (props) => {
    // State to store the recipes fetched from the database
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    // State that stores if we are waiting for API calls to return
    const [isLoading, setLoading] = useState([])

    // State to store day fetched from the database
    const [day, setDay] = useState(new Date().getDay())

    // State to store the budget fetched from the database
    const [budget, setBudget] = useState([])

    // State to store the spent fetched from the database
    const [spent, setSpent] = useState([])

    console.log(props)
    // On the first render, make an API call to the backend, to fetch the recipe data from the database

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.log("user not logged in")
            navigate('/login')
        }  
        async function getRecipes(url) {
            try {
                // for authentication purposes    
                const jwtToken = localStorage.getItem("token")
                const authToken = 'jwt ' + jwtToken + ''           
                let response = await axios(url, {headers: { Authorization: authToken }})
                setBudget(response.data.budget)
                setSpent(response.data.spent)
                response = await axios.post(url, {
                    day: day,
                }, {headers: { Authorization: authToken }})
                console.log(response)
                setRecipes(response.data.recipes)
                setDay(response.data.dayOfWeek)
                setLoading(false);
                props.setInfoLoading(false);
            } catch (err) {
                console.log(err)
            }
        }
        if(day !== null) {
            getRecipes(props.apiLink);
        }
    }, [day, props.apiLink])

    // Get the list of ing and price for each recipe
    //https://getbutterfly.com/generate-html-list-from-javascript-array/
    if(typeof recipes !== 'undefined' && recipes.length === 0)
    {
        return null
    }

    let totalPMorn;
    let totalPAft;
    let totalPEve;
    if(recipes[0] === null)
    {

    }
    else
    {
        totalPMorn = recipes[0].price
    }
    if(recipes[1] === null)
    {

    }
    else
    {
        totalPAft = recipes[1].price
    }
    if(recipes[2] === null)
    {

    }
    else
    {
        totalPEve = recipes[2].price
    }

    // onClick events that save timeOfDay for user schema
    const editClickBreak = () => {
        const url = process.env.REACT_APP_SERVER_HOSTNAME + '/';
        const jwtToken = localStorage.getItem("token")
        const authToken = 'jwt ' + jwtToken + ''
        try {
            axios.post(url, {
                time: "breakfast"
            }, {headers: { Authorization: authToken }})
        } catch (err) {
            console.log(err);
        }
    }
    const editClickLunch = () => {
        const url = process.env.REACT_APP_SERVER_HOSTNAME + '/';
        const jwtToken = localStorage.getItem("token")
        const authToken = 'jwt ' + jwtToken + ''
        try {
            axios.post(url, {
                time: "lunch"
            }, {headers: { Authorization: authToken }})
        } catch (err) {
            console.log(err);
        }
    }
    const editClickDinner = () => {
        const url = process.env.REACT_APP_SERVER_HOSTNAME + '/';
        const jwtToken = localStorage.getItem("token")
        const authToken = 'jwt ' + jwtToken + ''
        try {
            axios.post(url, {
                time: "dinner"
            }, {headers: { Authorization: authToken }})
        } catch (err) {
            console.log(err);
        }
    }

    //temp comment out for out of mockaroo req
    currBudget = budget
    currSpent = spent
    
    if (isLoading) {
        return (
           <div className="loadingSpinner"><CircularProgress /></div>
        )
    } else {
    return (
        <>
        <div className="progress-area">
            <p className="tracker-text">Budget Tracker</p>
            <Progress done={currSpent} budget={currBudget}/>
        </div>
        <FormControl fullWidth>
            <NativeSelect
                className = "select"
                defaultValue={day}
                inputProps={{
                name: 'days',
                }}
                onChange={(event) =>
                    setDay(event.target.value)
                }
            >
                <option value={1}>Monday</option>
                <option value={2}>Tuesday</option>
                <option value={3}>Wednesday</option>
                <option value={4}>Thursday</option>
                <option value={5}>Friday</option>
                <option value={6}>Saturday</option>
                <option value={0}>Sunday</option>
            </NativeSelect>
        </FormControl>
        <div className="meals">
            <MealCard
                noSelection={recipes[0]===null}
                meal="Breakfast"
                src={recipes[0] !== null ? recipes[0].image : ''}
                recipeName={recipes[0] !== null ? recipes[0].recipeName : ''}
                ingredients={recipes[0] !== null ? recipes[0].ingredients : ''}
                instructions={recipes[0] !== null ? recipes[0].instructions : ''}
                cost={totalPMorn}
                onClick={editClickBreak}
            />
            <MealCard
                noSelection={recipes[1]===null}
                meal="Lunch"
                src={recipes[1] !== null ? recipes[1].image : ''}
                recipeName={recipes[1] !== null ? recipes[1].recipeName : ''}
                ingredients={recipes[1] !== null ? recipes[1].ingredients : ''}
                instructions={recipes[1] !== null ? recipes[1].instructions : ''}
                cost={totalPAft}
                onClick={editClickLunch}
            />
            <MealCard
                noSelection={recipes[2]===null}
                meal="Dinner"
                src={recipes[2] !== null ? recipes[2].image : ''}
                recipeName={recipes[2] !== null ? recipes[2].recipeName : ''}
                ingredients={recipes[2] !== null ? recipes[2].ingredients : ''}
                instructions={recipes[2] !== null ? recipes[2].instructions : ''}
                cost={totalPEve}
                onClick={editClickDinner}
            />
        </div>
    </>
    )
    }
}

//later change <Progress done="70"/> change to 
const Progress = (props) => {
    let progress = `$${props.done} spent out of $${props.budget}`
    let width = ((props.done/props.budget)*100).toString()
    return (
        <>
        <div className="progress">
            <div className={currSpent > currBudget ? "progress-done-over" : "progress-done-under"} style={{
                opacity: 1,
                width: `${width}%`
            }}>
            </div>
        </div>
        <div className="progress-text">
            {progress}
        </div>
        </>
    )
}

//use https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0 for weekly_budget
const MealPlan = () => {
    const [infoLoading, setInfoLoading] = useState(true);

    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/`

    if (infoLoading) {
        return (
            <>
            <h1>My Meal Plan</h1>
            <div className='loadingSpinner'><CircularProgress /></div>
            <div className='recipeInfo'><RecipeInfo route='/' apiLink={apiLink} setInfoLoading={setInfoLoading}/></div>
            </>
        )

    } else {
        return (
            <>
            <h1>My Meal Plan</h1>
            <div className='recipeInfo'><RecipeInfo route='/' apiLink={apiLink} setInfoLoading={setInfoLoading}/></div>
            </>
        )

    }
}

export default MealPlan;