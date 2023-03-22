import React from 'react';
import { IconContext } from "react-icons";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import logo from "../logo.png";
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <Link to="/account">
        <div className="accountIcon">
          <IconContext.Provider value={{ className: "icon blueText" }}>
            <div><BsPersonCircle /></div>
          </IconContext.Provider>
        </div>
      </Link>
    </div>
  );
}

export default Header;