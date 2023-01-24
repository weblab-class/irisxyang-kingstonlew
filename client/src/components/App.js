import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";
import { GOOGLE_CLIENT_ID } from "../utilities";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import Archive from "./pages/Archive.js";
import Draw from "./pages/Draw.js";

import "../utilities.css";
import "./App.css";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUser(user);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      console.log({ user });
      setUser(user);
    });
  };

  const handleLogout = () => {
    setUser(undefined);
    post("/api/logout");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <NavBar user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className="App-container">
        <Router>
          <Home path="/" user={user} />
          <About path="/about" />
          <Draw path="/draw" />
          <Archive path="/archive" />
          <Profile path="/profile/:id" user={user} />
          <NotFound default />
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
