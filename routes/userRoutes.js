const express = require("express")
const userControllers = require("../controllers/userControllers")
const router = express.Router()

router.route("/")
  .get(userControllers.getUsers)

router.route("/signup")
  .get(userControllers.renderSignupPage)
  .post(userControllers.signupUser)

router.route("/delete")
  .post(userControllers.deleteUser)

module.exports = router
