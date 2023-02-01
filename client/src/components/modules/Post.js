import React, { useState } from "react";
import Drawing, { PIXEL_SIZE } from "./Drawing";
import { Link } from "@reach/router";
import moment from "moment";
import "./Post.css";
import noUserHeart from "../../public/nouserheart.png";
import likedImg from "../../public/liked.png";
import unlikedImg from "../../public/unliked.png";
import { post as postReq } from "../../utilities";

const GRID_SIZE = 16;

const Post = ({ post, setPost, userSignedIn, setProfileLikes, showHeading = false }) => {
  const [canHitLikeButton, setCanHitLikeButton] = useState(true);
  const { user, picture, date, word, likes, hasLiked } = post;
  const postUnliked = userSignedIn && !hasLiked;

  const heartImage = !userSignedIn ? noUserHeart : hasLiked ? likedImg : unlikedImg;

  const like = async () => {
    setCanHitLikeButton(false);
    await postReq("/api/like", { postId: post._id });
    setProfileLikes && setProfileLikes(1);
    setPost(post._id, { ...post, likes: likes + 1, hasLiked: true });
    setCanHitLikeButton(true);
  };

  const unlike = async () => {
    setCanHitLikeButton(false);
    await postReq("/api/unlike", { postId: post._id });
    setProfileLikes && setProfileLikes(-1);
    setPost(post._id, { ...post, likes: likes - 1, hasLiked: false });
    setCanHitLikeButton(true);
  };

  return (
    <div className="flex flex-column items-center ma3 mb4" style={{ width: "fit-content" }}>
      {showHeading && (
        <h1 className="tc fw0">
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
            <img
              src={heartImage}
              className={userSignedIn ? "pointer" : ""}
              width="28px"
              height="28px"
              alt=""
              onClick={
                !userSignedIn || !canHitLikeButton
                  ? undefined
                  : () => {
                      postUnliked ? like() : unlike();
                    }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
