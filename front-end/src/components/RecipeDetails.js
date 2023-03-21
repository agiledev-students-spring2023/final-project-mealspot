import { useLocation } from 'react-router-dom'
import axios from 'axios'

const RecipeDetails = props => {
    const location = useLocation()
    const details = location?.state?.details

    async function getRecipe() {
        const response = await axios('https://my.api.mockaroo.com/recipe.json?key=4885b010')
        wah(response.data)
        console.log(response.data);
    }

    function wah(data) {
        console.log(data);
    }

    return (
        <div className="recipe-details">
            <h1>{details.recipeName}</h1>
            {/* <img src={recipe.image} alt="aa"></img> */}
        </div>
    )
}

export default RecipeDetails