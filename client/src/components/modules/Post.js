import React from "react";
import Drawing, { PIXEL_SIZE } from "./Drawing";
import { Link } from "@reach/router";
import moment from "moment";
import "./Post.css";

const GRID_SIZE = 16;

const Post = ({ post, showHeading = false }) => {
  const { user, picture, date, word } = post;
  return (
    <div className="flex flex-column items-center" style={{ width: "fit-content" }}>
      {showHeading && (
        <h1 className="tc">
          {moment(date).format("MM/DD/YYYY")}: {word}
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
