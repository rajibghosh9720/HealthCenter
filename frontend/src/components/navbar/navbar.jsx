import React from "react";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <IoIosHome className="home-icon" />{" "}
          <span className="logo-text">Health Center</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
