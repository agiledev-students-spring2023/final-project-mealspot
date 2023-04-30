import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NativeSelect } from '@mui/material';
import { IconContext } from "react-icons";
import { AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import './MealPlan.css';
import { CircularProgress, FormControl, InputLabel } from '@mui/material';

//keep track of current money spent and budget, will be changed by user
let currSpent = 0
let currBudget = 0

const RecipeInfo = (props) => {
    // State to store the recipes fetched from the database
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    // State to indicate whether we are still waiting on the data fetch
    const [isLoading, setLoading] = useState(true);

    // State to store day fetched from the database
    const [day, setDay] = useState(new Date().getDay())

    // State to store the budget fetched from the database
    const [budget, setBudget] = useState([])

    // State to store the spent fetched from the database
    const [spent, setSpent] = useState([])

    console.log(props)
    // On the first render, make an API call to the backend, to fetch the recipe data from the database
    let initialRender = true;
    useEffect(() => {
        async function getRecipes(url) {
            try {
                // for authentication purposes    
                const jwtToken = localStorage.getItem("token")
                const authToken = 'jwt ' + jwtToken + ''           
                const response = await axios(url, {headers: { Authorization: authToken }})
                console.log(response)
                setRecipes(response.data.recipes)
                setBudget(response.data.budget)
                setSpent(response.data.spent)
                setDay(response.data.dayOfWeek)
            } catch (err) {
                console.log(err)
            }
        }
        if (!initialRender) {
            getRecipes(props.apiLink);
          } else {
            initialRender = false;
          }
    }, [props.apiLink])
    
    //setting day
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.log("user not logged in")
            navigate('/login')
        }  
        async function getRecipesAgain(url) {
            try {
                // for authentication purposes
                const jwtToken = localStorage.getItem("token")
                const authToken = 'jwt ' + jwtToken + ''
                const response = await axios.post(url, {
                    day: day,
                }, {headers: { Authorization: authToken }})
                setDay(response.data.dayOfWeek)
                setRecipes(response.data.recipes)
                setLoading(false);
            } catch (err) {
                console.log(err)
            }
        }
        if (initialRender && day !== null) {
            getRecipesAgain(props.apiLink);
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
            <>
            <div className='loadingSpinner'><CircularProgress /></div>
            </>
        );
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
            <div className="meal-card">
                <div className="card-break">
                    <div className="meal-card-col1">
                        <div className="card-day">Breakfast</div>
                        {recipes[0] !== null ? (<div className="card-img"><img src={recipes[0].image} alt={recipes[0].recipeName} width='100px' height='100px'/></div>) : <div className="card-img">No Image</div>}
                    </div>
                    <div className="meal-card-col2">
                        {recipes[0] !== null ? (<div className="card-name">{recipes[0].recipeName}</div>) : <p>No Recipe</p>}
                    </div>
                    <div className="meal-card-col3">
                        <div className="card-edit">
                            <Link to="/choosesavedrecipes" className="link-edit" onClick={editClickBreak}>
                                <IconContext.Provider value={{ className: "navbar-icon-edit" }}>
                                <div><AiFillEdit /></div>
                                </IconContext.Provider>
                                Edit
                            </Link>
                        </div>
                        <div className="card-cost">${totalPMorn}</div>
                    </div>
                </div>
                <div className="card-lunch">
                    <div className="meal-card-col1">
                        <div className="card-day">Lunch</div>
                        {recipes[1] !== null ? (<div className="card-img"><img src={recipes[1].image} alt={recipes[1].recipeName} width='100px' height='100px'/></div>) : <div className="card-img">No Image</div>}
                    </div>
                    <div className="meal-card-col2">
                        {recipes[1] !== null ? (<div className="card-name">{recipes[1].recipeName}</div>) : <p>No Recipe</p>}
                    </div>
                    <div className="meal-card-col3">
                        <div className="card-edit">
                            <Link to="/choosesavedrecipes" className="link-edit" onClick={editClickLunch}>
                                <IconContext.Provider value={{ className: "navbar-icon-edit" }}>
                                <div><AiFillEdit /></div>
                                </IconContext.Provider>
                                Edit
                            </Link>
                        </div>
                        <div className="card-cost">${totalPAft}</div>
                    </div>
                </div>
                <div className="card-dinner">
                    <div className="meal-card-col1">
                        <div className="card-day">Dinner</div>
                        {recipes[2] !== null ? (<div className="card-img"><img src={recipes[2].image} alt={recipes[2].recipeName} width='100px' height='100px'/></div>) : <div className="card-img">No Image</div>}
                    </div>
                    <div className="meal-card-col2">
                        {recipes[2] !== null ? (<div className="card-name">{recipes[2].recipeName}</div>) : <p>No Recipe</p>}
                    </div>
                    <div className="meal-card-col3">
                        <div className="card-edit">
                            <Link to="/choosesavedrecipes" className="link-edit" onClick={editClickDinner}>
                                <IconContext.Provider value={{ className: "navbar-icon-edit" }}>
                                <div><AiFillEdit /></div>
                                </IconContext.Provider>
                                Edit
                            </Link>
                        </div>
                        <div className="card-cost">${totalPEve}</div>
                    </div>
                </div>
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
    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/`

    return (
        <>
        <h1>My Meal Plan</h1>
        <RecipeInfo route='/' apiLink={apiLink}/>
        </>
    )
}

export default MealPlan;