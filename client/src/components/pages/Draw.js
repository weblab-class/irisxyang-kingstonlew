import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Editor from "./PixelEditor/Editor";

const formatPicture = (picture) => picture.map((row) => row.map((color) => ({ color })));

const Draw = () => {
  const [post, setPost] = useState();

  useEffect(() => {
    get("/api/getPost").then((res) => {
      if (res) {
        setPost(res.post);
      }
    });
  }, []);

  return (
    <div className="flex flex-column">
      <h1 className="tc">Draw</h1>
      <Editor
        initialGrid={post ? formatPicture(post.picture) : null}
        postId={post ? post._id : null}
      />
    </div>
  );
};

export default Draw;
