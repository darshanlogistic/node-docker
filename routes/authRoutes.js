const express = require("express")
const authCont = require("../controllers/authController")
const router = express.Router()

router.route("/signup").post(authCont.signUp)
router.route("/login").post(authCont.login)

module.exports = router
