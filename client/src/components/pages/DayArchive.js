import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Post from "../modules/Post";
import moment from "moment";

const DayArchive = ({ date, user }) => {
  const [posts, setPosts] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    get("/api/pastDrawings", { date }).then(({ word, drawings }) => {
      setPosts(drawings);
      setWord(word);
    });
  }, [date]);

  const updatePosts = (id, post) => {
    setPosts(posts.map((p) => (p._id === id ? post : p)));
  };

  return (
    <div>
      <h1 className="tc ma0 pa0 mt4 page-title">{moment(date).format("MM/DD/YYYY")} ARCHIVE</h1>
      <h2 className="tc fw1 f2 pt0 ma0 mb4">word of the day: {word}</h2>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {posts.map((post) => (
          <Post setPost={updatePosts} post={post} userSignedIn={user !== undefined} />
        ))}
      </div>
    </div>
  );
};

export default DayArchive;
