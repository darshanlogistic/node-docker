const express = require("express")
const postCont = require("../controllers/postControllers")
const router = express.Router()

router.route("/").get(postCont.getAllPosts).post(postCont.createPost)
router
  .route("/:id")
  .get(postCont.getOnePost)
  .patch(postCont.updatePost)
  .delete(postCont.deletePost)

module.exports = router
