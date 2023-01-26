import React from "react";
import "./Home.css";
import { Link } from "@reach/router";
import Post from "../modules/Post";
import { get } from "../../utilities";

const Home = ({ user }) => {
  const [word, setWord] = React.useState();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    get("/api/todaysDrawings").then((res) => {
      console.log(res);
      setPosts(res);
    });
    get("/api/todaysWord").then((res) => setWord(res.word));
  }, []);

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
        {posts.map((post) => (
          <Post post={post} isToday />
        ))}
      </div>
    </div>
  );
};

export default Home;
