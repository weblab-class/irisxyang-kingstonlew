import React, { useState } from "react";
import { post } from "../../utilities";

import { TextField, Button } from "@material-ui/core";
import { navigate } from "@reach/router";

const Settings = ({ user, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  const editUser = () => {
    if (!username.length || !bio.length) return window.alert("Fill in all fields!");
    post("/api/editUser", { username, bio }).then((res) => {
      if (res.user) {
        setUser(res.user);
        navigate(`/profile/${res.user.username}`);
      }
    });
  };

  return (
    <div className="flex flex-column items-center">
      <h1 className="tc ma4 page-title">SETTINGS</h1>
      <div className="mv2">
        <h1 className="tc">edit username</h1>
        <TextField
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          inputProps={{ maxLength: 12 }}
        />
      </div>
      <div className="mv2">
        <h1 className="tc">edit bio</h1>
        <TextField
          variant="outlined"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          minRows={3}
          maxRows={3}
          inputProps={{ maxLength: 200 }}
          multiline
        />
      </div>
      <Button
        style={{
          width: "fit-content",
          textTransform: "none",
          backgroundColor: "#EB449F",
          color: "white",
          fontFamily: '"VT323", "Roboto", sans-serif',
        }}
        onClick={editUser}
      >
        Save Settings
      </Button>
    </div>
  );
};

export default Settings;
