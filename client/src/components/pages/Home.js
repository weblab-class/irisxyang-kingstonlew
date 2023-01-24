import React from "react";
import "./Home.css";
import { Link } from "@reach/router";
import Post from "../modules/Post";

const Home = ({ user }) => {
  const [word, setWord] = React.useState("foot");

  return (
    <div className="flex flex-column">
      <h1 className="tc ma4 page-title">* WELCOME TO [REDACTED] *</h1>
      <div className="word-container">
        <h1 className="tc ma0 fw1 f1">WORD OF THE DAY:</h1>
        <h2 className="tc ma0 mb3 fw1 f1">{word}</h2>
        <Link to="/draw" className="link tertiary mv3 f3">
          create your own pix {"-->"}
        </Link>
      </div>
      <div>
        <Post post={{ picture: [], user: {}, word: "1/23", word: "foot" }} isToday={true} />
      </div>
    </div>
  );
};

export default Home;
