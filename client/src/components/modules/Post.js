import React from "react";
import Drawing, { PIXEL_SIZE } from "./Drawing";
import { Link } from "@reach/router";
import "./Post.css";

const GRID_SIZE = 16;

const Post = ({ post, isToday }) => {
  const { user, picture, date, word } = post;
  console.log({ user });
  return (
    <div className="flex flex-column">
      {!isToday && (
        <h1 className="tc">
          {date}: {word}
        </h1>
      )}
      <div className="post-container" style={{ width: GRID_SIZE * PIXEL_SIZE }}>
        <Drawing picture={picture} />
        <div className="primary-background w-100">
          <Link to={`/profile/${user[0].username}`}>{user[0].username}</Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
