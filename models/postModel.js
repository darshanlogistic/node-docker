const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
  title: {
    type: "string",
    require: [true, "Post must have title"],
  },
  body: {
    type: "string",
    require: [true, "Post must have body"],
  },
})
const Post = mongoose.model("Post", postSchema)
module.exports = Post
