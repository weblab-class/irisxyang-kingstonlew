import React from "react";
import { Link } from "@reach/router";
import "./NavBar.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const NavBar = ({ user, handleLogin, handleLogout }) => {
  return (
    <nav className="NavBar-container flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
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
      </div>
      <div className="flex flex-row">
        {user && (
          <Link to={`/profile/${user.username}`} className="NavBar-link">
            {user.username}
          </Link>
        )}
        {user ? (
          <div
            className="NavBar-link"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </div>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
