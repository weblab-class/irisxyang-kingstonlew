import React from "react";
import Drawing, { PIXEL_SIZE } from "./Drawing";
import { Link } from "@reach/router";
import moment from "moment";
import "./Post.css";
import heartBW from "../../public/heart_bw.png";

const GRID_SIZE = 16;

const Post = ({ post, showHeading = false }) => {
  const { user, picture, date, word, likes } = post;
  return (
    <div className="flex flex-column items-center" style={{ width: "fit-content" }}>
      {showHeading && (
        <h1 className="tc">
          {moment(date).format("MM/DD/YYYY")}: {word}
        </h1>
      )}
      <div className="post-container" style={{ width: GRID_SIZE * PIXEL_SIZE }}>
        <Drawing picture={picture} />
        <div className="flex flex-row justify-between items-center primary-background w-100 pa2 fw1 f2">
          <Link to={`/profile/${user[0].username}`} className="black link">
            {user[0].username}
          </Link>
          <div className="flex flex-row items-center">
            <span className="fw1 f2">{likes}</span>
            <img src={heartBW} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
