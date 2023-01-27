import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Post from "../modules/Post";
import moment from "moment";

const DayArchive = ({ date }) => {
  const [posts, setPosts] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    get("/api/pastDrawings", { date }).then(({ word, drawings }) => {
      setPosts(drawings);
      setWord(word);
    });
  }, [date]);

  return (
    <div>
      <h1 className="tc ma0 pa0 mt4 page-title">{moment(date).format("MM/DD/YYYY")} ARCHIVE</h1>
      <h2 className="tc fw1 f2 pt0 ma0 mb4">word of the day: {word}</h2>
      <div className="bordering flex flex-row flex-wrap items-center justify-center">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};

export default DayArchive;
