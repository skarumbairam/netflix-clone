import React from "react";
import logo from "../assets/netflix_logo.png";

const Header = () => {
  return (
    <header>
      <div className="px-8 py-2 bg-gradient-to-b from-black z-10 relative">
        <img className="w-44" src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
