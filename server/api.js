/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const moment = require("moment");
// import models so we can interact with the database
const User = require("./models/user");
const Post = require("./models/post");

// import authentication library
const auth = require("./auth");
const { getWord, today, formatPost } = require("./util");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/todaysWord", (req, res) => {
  const date = new Date();
  const word = getWord(date);
  res.send({ word });
});

router.get("/todaysDrawings", async (req, res) => {
  const date = today();
  const drawings = await Post.find({ date }).populate("user");
  const posts = await Promise.all(drawings.map(formatPost));
  res.send(posts);
});

router.get("/pastDrawings", async (req, res) => {
  const { date } = req.query;
  const word = getWord(date);
  const drawings = await Post.find({ date }).populate("user");
  const posts = await Promise.all(drawings.map(formatPost));
  res.send({ word, drawings: posts });
});

router.get("/userPosts", async (req, res) => {
  const { user } = req.query;
  const drawings = await Post.find({ user }).populate("user");
  const posts = await Promise.all(drawings.map(formatPost));
  res.send(posts);
});

router.get("/user", async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  res.send({ user });
});

router.post("/post", auth.ensureLoggedIn, async (req, res) => {
  const { picture, id } = req.body;
  const date = today();
  const word = getWord(date);
  if (id) {
    const post = await Post.findByIdAndUpdate(id, { picture });
    return res.send({ msg: "ok" });
  }
  const post = new Post({ date, word, picture, user: req.session.user._id });
  await post.save();
  res.send({ post });
});

/**
 * For fetching a post for today's canvas
 */
router.get("/getPost", auth.ensureLoggedIn, async (req, res) => {
  const date = today();
  const post = await Post.findOne({ date, user: req.session.user._id });
  res.send({ post });
});

router.post("/editUser", auth.ensureLoggedIn, async (req, res) => {
  const { username, bio } = req.body;
  console.log(req.body);
  const otherUser = await User.findOne({ username });
  const doesExist = otherUser !== null && otherUser.googleid !== req.session.user.googleid;
  if (doesExist) {
    console.log("user taken :(");
    return res.status(401).send({ error: "username is taken wahhhhhhhhh :'(" });
  }
  const user = await User.findById(req.session.user._id);
  user.username = username;
  user.bio = bio;
  await user.save();
  req.session.user = user;
  res.send({ user });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
