import React, { useEffect, useState } from "react";
import "./Profile.css";
import { get } from "../../utilities";
import NotFound from "./NotFound";
import Post from "../modules/Post";
import heartBW from "../../public/heart_bw.png";

const calcLikes = (posts) => {
  let total = 0;
  for (const post of posts) {
    total += post.likes;
  }
  return total;
};

const Profile = ({ username }) => {
  const [profileUser, setProfileUser] = useState("loading");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    get("/api/user", { username }).then((res) => {
      if (res.user) {
        setProfileUser(res.user);
        get("/api/userPosts", { user: res.user._id }).then((p) => {
          console.log(p);
          setPosts(p.reverse());
          setLikes(calcLikes(p));
        });
      } else {
        setProfileUser(null);
      }
    });
  }, [username]);

  if (!profileUser) return <NotFound />;

  return (
    <div className="w-100 pa4">
      <div className="flex flex-row justify-center pa4 ">
        <img
          className="userimage"
          src={profileUser.picture}
          alt=""
          width="200"
          height="200"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
          }}
        />
        <div className="flex flex-column ml4">
          <h1 className="f1 fw1 mv0">@{profileUser.username}</h1>
          <div className="flex flex-row justify-between mv2">
            <div className="bg-stat fw1 f2 ph2 mr2">{posts.length} pix</div>
            <div className="bg-stat flex flex-row items-center ph2 ml2">
              <span className="fw1 f2">{likes}</span>
              <img src={heartBW} alt="" />
            </div>
          </div>
          <h2 className="f2 fw1 mv0 mt2">{profileUser.bio}</h2>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center w-100">
        {posts.map((post) => (
          <Post post={post} showHeading />
        ))}
      </div>
    </div>
  );
};

export default Profile;
