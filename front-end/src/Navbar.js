import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
  <div className="navbar">
    <Link to="/" className="link">
      <li>Meal plan</li>
    </Link>
    <Link to="/recipesearch" className="link">
      <li>Recipe search</li>
    </Link>
    <Link to="/savedrecipes" className="link">
      <li>Saved recipes</li>
    </Link>
    <Link to="/fridge" className="link">
      <li>Fridge</li>
    </Link>
    <Link to="/grocerylist" className="link">
      <li>Grocery list</li>
    </Link>
  </div>
  );
}

export default Navbar;