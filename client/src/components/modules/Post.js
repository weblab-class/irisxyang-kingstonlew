import React from "react";
import Drawing, { PIXEL_SIZE } from "./Drawing";
import "./Post.css";

const GRID_SIZE = 16;

const Post = ({ post, isToday }) => {
  const drawing = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      row.push("#ff00ff");
    }
    drawing.push(row);
  }
  const { user, picture, date, word } = post;
  return (
    <div className="flex flex-column">
      {!isToday && (
        <h1 className="tc">
          {date}: {word}
        </h1>
      )}
      <div className="post-container" style={{ width: GRID_SIZE * PIXEL_SIZE }}>
        <Drawing picture={drawing} />
        <div className="primary-background w-100">user1</div>
      </div>
    </div>
  );
};

export default Post;
