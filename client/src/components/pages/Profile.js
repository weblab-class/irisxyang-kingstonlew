import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  return (
    <div>
      <div className="userinfo-container">
        <div className="userimage-container">put image here</div>
        <div className="flex flex-column">
          <div className="flex flex-row">
            <h1 className="f1 fw1 mv0">@username</h1>
          </div>
          <h2 className="f3 fw1 mv0">here's a short, 200 character bio about me!</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
