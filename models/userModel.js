const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    require: [true, "Username must have title"],
  },
  password: {
    type: "string",
    require: [true, "Password must have body"],
  },
})
const User = mongoose.model("User", userSchema)
module.exports = User
