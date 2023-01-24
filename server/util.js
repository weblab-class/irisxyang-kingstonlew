const moment = require("moment");

function getWord(date) {
  return "foot";
}

function today() {
  return moment().format("YYYY-MM-DD");
}

module.exports = { getWord, today };
