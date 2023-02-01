const moment = require("moment");
const words = require("./words");
const Like = require("./models/like");
const Post = require("./models/post");
const User = require("./models/user");

const START_DATE = "2023-01-28";

function getWord(date) {
  const start = moment(START_DATE);
  const end = moment(date);
  const delta = end.diff(start, "days");
  const wordsList = words.words;
  return wordsList[delta % wordsList.length];
}

function today() {
  return moment().format("YYYY-MM-DD");
}

function getWords(date) {
  let start = moment(START_DATE);
  const end = moment(date);
  const delta = end.diff(start, "days");
  const wordsList = words.words;
  const out = [];
  for (let i = 0; i < delta; i++) {
    const word = wordsList[i % wordsList.length];
    out.push([start.format("YYYY-MM-DD"), word]);
    start = start.add(1, "days");
  }
  return out.reverse();
}

async function formatPost(post, userId) {
  const likes = await Like.countDocuments({ postId: post._id.toString() });
  if (!userId) return { ...post.toObject(), likes };
  const hasLiked = (await Like.findOne({ userId, postId: post._id.toString() })) !== null;
  return { ...post.toObject(), likes, hasLiked };
}

module.exports = { getWord, today, formatPost, getWords };
