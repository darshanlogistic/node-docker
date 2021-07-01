const User = require("../models/userModel")

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json({
      status: 200,
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error.message,
    })
  }
}

exports.login = async (req, res, next) => {
  console.log("called login")
  try {
    const user = await User.findOne(req.body)
    if (user) {
      req.session.user = user
      res.status(200).json({
        status: 200,
        data: user,
      })
    } else {
      res.status(400).json({
        status: 400,
        error: "User Not Found",
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error.message,
    })
  }
}
