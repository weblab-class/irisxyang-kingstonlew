import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">REDACTED</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          home
        </Link>
        <Link to="/about" className="NavBar-link">
          about
        </Link>
        <Link to="/draw" className="NavBar-link">
          draw
        </Link>
        <Link to="/archive" className="NavBar-link">
          archive
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
