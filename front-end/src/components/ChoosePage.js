import React from 'react';
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './ChoosePage.css';

const ChoosePage = () => {
    return (
        <>
        <Link to="/" className="link-back">
            <IconContext.Provider value={{ className: "back-icon" }}>
                <div><AiFillCloseCircle /></div>
            </IconContext.Provider>
        </Link>
        <div className="middle">
            <h1>Edit Meal</h1>
        </div>
        <div className="choose-saved-recipes-button">
        <Link to="/choosesavedrecipes" className="link-choose-page">
            Choose From Saved Meals
        </Link>
        </div>
        <div className="add-page-button">
        <Link to="/addpage" className="link-choose-page">
            Add Your Own
        </Link>
        </div>
        </>
    );
}

export default ChoosePage;

