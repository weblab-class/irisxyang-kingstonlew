import React, { useEffect, useState } from "react";
import "./Profile.css";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import NotFound from "./NotFound";

const Profile = ({ user, username, setUser }) => {
  const [profileUser, setProfileUser] = useState("loading");

  useEffect(() => {
    get("/api/user", { username }).then((res) => {
      if (res.user) {
        setProfileUser(res.user);
      } else {
        setProfileUser(null);
      }
    });
  }, [username]);

  const editUser = (username, bio) => {
    post("/api/editUser", { username, bio }).then((res) => {
      res.user && setUser(res.user);
    });
  };

  if (!profileUser) return <NotFound />;

  const isSame = profileUser._id === user?._id;
  console.log({ isSame });

  return (
    <div>
      <div className="userinfo-container">
        <div className="userimage-container">
          <img src={profileUser.picture} alt="" />
        </div>
        <div className="flex flex-column">
          <div className="flex flex-row">
            <h1 className="f1 fw1 mv0">@{profileUser.username}</h1>
          </div>
          <h2 className="f3 fw1 mv0">{profileUser.bio}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
