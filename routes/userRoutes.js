const express = require("express")
const userControllers = require("../controllers/userControllers")
const router = express.Router()

router.route("/")
  .get(userControllers.renderSignupPage)
  .post(userControllers.getUsers)

module.exports = router