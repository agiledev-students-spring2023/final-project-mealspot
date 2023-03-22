import { useLocation } from 'react-router-dom'
import { Box, List, ListItemText, Button } from '@mui/material'
import axios from 'axios'

const RecipeDetails = props => {
    const location = useLocation()
    const details = location?.state?.details

    // for testing while api is capped
    const dat = { "name": "potato", "id": 1, "ingredients": ["Crackers - Trio", "potato", "tomato"], "instructions": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.", "image": "http://dummyimage.com/300x300.png/cc0000/ffffff" }

    const getRecipe = async () => {
        const response = await axios.get('https://my.api.mockaroo.com/recipe.json?key=4885b010')
        return await response.data
    }

    const recipe = getRecipe()
    // console.log(recipe);

    const ingredients = dat.ingredients.map((ingredient) => {
        return <li>{ingredient}</li>
    })

    const handleClick = () => {
        // todo handle saving when backend is implemented
    }

    return (
        <div className="recipe-details">
        <Box>
            <h1>{dat.name}</h1>
            <img src={dat.image} alt="aa"></img>
            <h2>Ingredients</h2>
            <List>
                <ListItemText primary={ingredients}/>
            </List>
            <h2>Instructions</h2>
            <p>{dat.instructions}</p>
            <Button variant="contained" onClick={handleClick}>Save Recipe</Button>
        </Box>
        </div>
    )

}

export default RecipeDetails