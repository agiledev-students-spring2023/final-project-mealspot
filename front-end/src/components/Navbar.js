import React from 'react';
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineHome, AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { BiFridge } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar blueBackground">
      <Link to="/" className="link">
        <li>
          <IconContext.Provider value={{ className: "navbarIcon" }}>
            <div><AiOutlineHome /></div>
          </IconContext.Provider>
          Meal plan
        </li>
      </Link>
      <Link to="/recipesearch" className="link">
        <li>
          <IconContext.Provider value={{ className: "navbarIcon" }}>
            <div><AiOutlineSearch /></div>
          </IconContext.Provider>
          Search
        </li>
      </Link>
      <Link to="/savedrecipes" className="link">
        <li>
          <IconContext.Provider value={{ className: "navbarIcon" }}>
            <div><AiOutlineStar /></div>
          </IconContext.Provider>
          Saved
        </li>
      </Link>
      <Link to="/fridge" className="link">
        <li>
          <IconContext.Provider value={{ className: "navbarIcon" }}>
            <div><BiFridge /></div>
          </IconContext.Provider>
          Fridge
        </li>
      </Link>
      <Link to="/grocerylist" className="link">
        <li>
          <IconContext.Provider value={{ className: "navbarIcon" }}>
            <div><HiOutlineClipboardList /></div>
          </IconContext.Provider>
          Grocery list
        </li>
      </Link>
    </div>
  );
}

export default Navbar;