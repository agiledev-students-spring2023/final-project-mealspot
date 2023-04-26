import { React } from 'react';
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
    const apiLink = `${process.env.REACT_APP_SERVER_HOSTNAME}/choosesavedrecipes`;
    return (
        <div class = "popup"> 
            <div>
                <Link to="/choosepage" className="link-edit">
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
                    <RecipeDisplay route='choosesavedrecipes' apiLink={apiLink} />
                 </div>
            </div>
        </div>
    );
}

export default ChooseSavedRecipes;