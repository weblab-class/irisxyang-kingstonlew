import React from "react";
import { Link } from "@reach/router";
import "./NavBar.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import logo from "../../public/logo.png";

const NavBar = ({ user, handleLogin, handleLogout }) => {
  return (
    <nav className="NavBar-container flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <Link className="flex flex-row items-center black" to="/">
          <img src={logo} width="36px" height="36px" alt="" />
          <span className="NavBar-title ml2">PIXELTHIS</span>
        </Link>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            home
          </Link>
          <Link to="/about" className="NavBar-link">
            about
          </Link>
          {user && (
            <Link to="/draw" className="NavBar-link">
              draw
            </Link>
          )}
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
        {user && (
          <Link to={`/settings`} className="NavBar-link">
            settings
          </Link>
        )}
        {user ? (
          <div
            className="NavBar-link pointer"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            logout
          </div>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
