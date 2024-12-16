const express = require("express")
const postControllers = require("../controllers/postControllers")
const router = express.Router()

router.route("/")
  .get(postControllers.getAllPosts)

router.route("/new")
  .get(postControllers.renderNewPostScreen)
  .post(postControllers.createNewPost)

router.route("/delete")
  .post(postControllers.deletePost)

router.route("/see/:id").get(postControllers.getPostById)

module.exports = router
