const mongoose = require("mongoose");
const searchSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
});
const search = mongoose.model("searchs", searchSchema);

module.exports = search;
