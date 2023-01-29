const moment = require("moment");
const words = require("./words");
const Like = require("./models/like");

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

async function formatPost(post) {
  const likes = await Like.countDocuments({ postId: post._id });
  return { ...post.toObject(), likes };
}

module.exports = { getWord, today, formatPost };
