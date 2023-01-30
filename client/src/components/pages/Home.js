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
    <div className="flex flex-column items-center">
      <h1 className="tc ma4 page-title">* WELCOME TO PIXELTHIS *</h1>
      <div className="word-container w-70">
        <h1 className="tc ma0 fw1 f1">WORD OF THE DAY:</h1>
        <h2 className="tc ma0 mb3 fw1 f1 i">{word}</h2>
        <Link to="/draw" className="link tertiary mv3 f3">
          create your own pix {"-->"}
        </Link>
        <Link to="/about" className="link tertiary mb4 mt1 f3">
          learn about PIXELTHIS {"-->"}
        </Link>
      </div>
      <h1 className="fw1 f1">TODAY'S PIX</h1>
      <div className="flex flex-row flex-wrap w-80 justify-center ">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
