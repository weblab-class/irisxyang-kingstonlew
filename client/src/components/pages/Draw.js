import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Editor from "./PixelEditor/Editor";

const formatPicture = (picture) => picture.map((row) => row.map((color) => ({ color })));

const Draw = () => {
  const [post, setPost] = useState();
  const [word, setWord] = useState("");

  useEffect(() => {
    get("/api/getPost").then((res) => {
      if (res) {
        setPost(res.post);
      }
    });
    get("/api/todaysWord").then((res) => {
      setWord(res.word);
    });
  }, []);

  return (
    <div className="flex flex-column">
      <h1 className="tc ma4 page-title">
        TODAY'S WORD:{" "}
        <a
          className="i link black"
          target="_blank"
          rel="noreferrer"
          href={`https://www.merriam-webster.com/dictionary/${word}`}
        >
          {word}
        </a>
      </h1>
      <Editor
        initialGrid={post ? formatPicture(post.picture) : null}
        postId={post ? post._id : null}
      />
    </div>
  );
};

export default Draw;
