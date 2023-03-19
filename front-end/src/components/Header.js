import React from 'react';
import { IconContext } from "react-icons";
import { BsFillFilePersonFill, BsFillEggFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
    <Link to="/" className="link1">
        <IconContext.Provider value={{ className: "navbar-icon" }}>
        <div><BsFillEggFill /></div>
        </IconContext.Provider>
        Logo
    </Link>
    <Link to="/account" className="link2">
        <IconContext.Provider value={{ className: "navbar-icon" }}>
          <div><BsFillFilePersonFill /></div>
        </IconContext.Provider>
        Account
    </Link>
    </div>
  );
}

export default Header;