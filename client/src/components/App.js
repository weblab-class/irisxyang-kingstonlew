import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import Archive from "./pages/Archive.js";

import "../utilities.css";
import "./App.css";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="App-container">
        <Router>
          <Home path="/" userId={userId} />
          <About path="/about" />
          <Archive path="/archive" />
          <Profile path="/profile" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
