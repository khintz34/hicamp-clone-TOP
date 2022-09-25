import React from "react";
import "../styles/Header.css";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <div id="headerDiv">
      <div id="logo-div">
        <img src={logo} alt="" className="logo" />
      </div>
      <div id="header-btns">
        <div className="header-btn">Near Me</div>
        <div className="header-btn">About</div>
        <div className="header-btn">Earn Hipcash</div>
        <div className="header-btn">Start hosting</div>
        <div className="header-btn">Log in</div>
        <button id="signUp-btn">Sign up</button>
      </div>
    </div>
  );
};

export default Header;
