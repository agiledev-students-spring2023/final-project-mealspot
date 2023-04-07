import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { NativeSelect } from '@mui/material';
import { IconContext } from "react-icons";
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './MealPlan.css';

//keep track of current money spent, will be changed by user
let currSpent = 70

//later change <Progress done="70"/> change to 
const Progress = ({done}) => {
    let budget = `$${currSpent}/$100` //$ spent/budget
    return (
        <div className="progress">
            <div className="progress-done" style={{
                opacity: 1,
                width: `${done}%`
            }}>
            {budget}
            </div>
        </div>
    )
}

//handles post request of the day of the week form
const handlePost = (selectedDay) => {
    const url = process.env.REACT_APP_SERVER_HOSTNAME + '/'
    try {
        axios.post(url, {
            day: selectedDay,
        })
    } 
    catch (err) {
        console.log(err);
    }
}

const Form = (props) => {
    let now = new Date()
    let today = now.getDay()
    const selectDay = (event) => {
        const day = event.target.value
        props.handlePost(day)
    }
    return (
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Day of the Week
            </InputLabel>
            <NativeSelect
                defaultValue={today}
                inputProps={{
                name: 'days',
                id: 'uncontrolled-native',
                }}
                onChange={selectDay}
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
    )
}

//<RecipeDisplay apiLink='https://my.api.mockaroo.com/recipe.json?key=8198c2b0' />
const RecipeInfo = (props) => {
    // State to store the recipes fetched from the database
    const [recipes, setRecipes] = useState([])

    // On the first render, make an API call to the backend, to fetch the recipe data from the database
    useEffect(() => {
        async function getRecipes(url) {
            try {
                const response = await axios(url)
                setRecipes(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getRecipes(props.apiLink)
    }, [props.apiLink])
    // Only grab the first 3 recipes
    //recipes = recipes.slice(0,3)
    
    // Get the list of ing for each recipe
    //https://getbutterfly.com/generate-html-list-from-javascript-array/
    if(typeof recipes !== 'undefined' && recipes.length === 0)
    {
        return null
    }
    else
    {
    const listIngMorn = Object.values(recipes[0].ingredients).map((ingredient) => (
        <li key={ingredient.ingredientName}>{ingredient.ingredientName}</li>
    ))
    const listIngAft = Object.values(recipes[1].ingredients).map((ingredient) => (
        <li key={ingredient.ingredientName}>{ingredient.ingredientName}</li>
    ))
    const listIngEve = Object.values(recipes[2].ingredients).map((ingredient) => (
        <li key={ingredient.ingredientName}>{ingredient.ingredientName}</li>
    ))

    // Get the price of each recipe
    const totalPMorn = Object.values(recipes[0].ingredients).reduce((price, curr) => {
        return price + (curr.ppu * curr.units)
    }, 0).toFixed(2)
    const totalPAft = Object.values(recipes[1].ingredients).reduce((price, curr) => {
        return price + (curr.ppu * curr.units)
    }, 0).toFixed(2)
    const totalPEve = Object.values(recipes[2].ingredients).reduce((price, curr) => {
        return price + (curr.ppu * curr.units)
    }, 0).toFixed(2)

    return (
        <div className="meal-card">
            <div className="card-break">
                <div className="meal-card-col1">
                    <div className="card-day">Breakfast</div>
                    <div className="card-img"><img src={recipes[0].image} alt={recipes[0].recipeName}/></div>
                </div>
                <div className="meal-card-col2">
                    <div className="card-name">{recipes[0].recipeName}</div>
                    <div className="card-ing">
                        <ul>
                        {listIngMorn}
                        </ul>
                        </div>
                </div>
                <div className="meal-card-col3">
                    <div className="card-edit">
                        <Link to="/choosepage" className="link-edit">
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
                    <div className="card-img"><img src={recipes[1].image} alt={recipes[1].recipeName}/></div>
                </div>
                <div className="meal-card-col2">
                    <div className="card-name">{recipes[1].recipeName}</div>
                    <div className="card-ing">
                        <ul>
                        {listIngAft}
                        </ul>
                        </div>
                </div>
                <div className="meal-card-col3">
                    <div className="card-edit">
                        <Link to="/choosepage" className="link-edit">
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
                    <div className="card-img"><img src={recipes[2].image} alt={recipes[2].recipeName}/></div>
                </div>
                <div className="meal-card-col2">
                    <div className="card-name">{recipes[2].recipeName}</div>
                    <div className="card-ing">
                        <ul>
                        {listIngEve}
                        </ul>
                        </div>
                </div>
                <div className="meal-card-col3">
                    <div className="card-edit">
                        <Link to="/choosepage" className="link-edit">
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
    )
    }

}

const MealPlan = () => {
    let budgetP = (currSpent/100)*100 //$ spent/budget * 100
    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/`;
    return (
        <>
        <h1>My Meal Plan</h1>
        <div className="progress-area">
        <p>Budget Tracker</p>
        <Progress done={budgetP.toString()}/>
        </div>
        <Form handlePost={handlePost}/>
        <RecipeInfo route='/' apiLink={apiLink}/>
        </>
    )
}

export default MealPlan;