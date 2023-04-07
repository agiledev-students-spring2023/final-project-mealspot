import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { NativeSelect } from '@mui/material';
import { IconContext } from "react-icons";
import { AiFillEdit } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';
import './MealPlan.css';

//keep track of current money spent and budget, will be changed by user
let currSpent = 0
let currBudget = 0

const Form = () => {
    let now = new Date()
    let today = now.getDay()
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

    //TEMP WAY TO GET ACCOUNT INFO
    const [data, setData] = useState([])
    const userID = useParams()
  
    useEffect(() => {
      // axios("https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0")
      axios('https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0')
        .then(response => {
          // extract the data from the server response
          console.log(response.data[0])
          setData(response.data[0])
        })
        .catch(err => {
          console.error(err) 

        })
    }, [userID])
    
    // Get the list of ing for each recipe
    //https://getbutterfly.com/generate-html-list-from-javascript-array/
    if(typeof recipes !== 'undefined' && recipes.length === 0)
    {
        return null
    }
    if(typeof data !== 'undefined' && data.length === 0)
    {
        return null
    }
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
    currSpent = (parseFloat(totalPMorn) + parseFloat(totalPAft) + parseFloat(totalPEve)).toFixed(2)
    currBudget = parseFloat(data.weekly_budget.slice(1))
    console.log(currSpent)
    console.log(currBudget)

    return (
        <>
        <div className="progress-area">
        <p>Budget Tracker</p>
        <Progress done={currSpent} budget={currBudget}/>
        </div>
        <Form />
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
        </>
    )

}

//later change <Progress done="70"/> change to 
const Progress = (props) => {
    let progress = `$${props.done}/$${props.budget}` //$ spent/budget
    let width = ((props.done/props.budget)*100).toString()
    return (
        <>
        <div className="progress">
            <div className="progress-done" style={{
                opacity: 1,
                width: `${width}%`
            }}>
            </div>
        </div>
        <div>
            {progress}
        </div>
        </>
    )
}

//use https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0 for weekly_budget
const MealPlan = () => {
    let budgetP = (currSpent/200)*200 //$ spent/budget * 100
    return (
        <>
        <h1>My Meal Plan</h1>
        <RecipeInfo apiLink='https://my.api.mockaroo.com/recipe.json?key=cf37bb40'/>
        </>
    )
}

export default MealPlan;