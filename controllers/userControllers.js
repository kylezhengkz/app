const queryMethods = require('../models/query')

exports.getUsers = async(req, res, next) => {
  console.log("Get users")
  let users = await queryMethods.findAll("users")
  res.render("display_users", { users: users })
}

exports.renderSignupPage = async(req, res, next) => {
  console.log("Render signup page")
  console.log(req.path)
  console.log(JSON.stringify(req.query))
  res.render("signup_page")
}

exports.signupUser = async(req, res, next) => {
  let { username, password } = req.body
  console.log(`Adding new user with username: "${username}" and password: "${password}"`)
  try {
    console.log(await queryMethods.addUserRecord(username, password))
    res.redirect("/users")
  } catch (err) {
    if (err instanceof queryMethods.DuplicateUsername) {
      console.log("Redirect with duplicate")
      res.redirect("/users/signup?duplicate=true")
    }
  }
}

exports.deleteUser = async(req, res, next) => {
  let { id } = req.body
  console.log(`Deleting user with id: ${id}`)
  try {
    console.log(await queryMethods.deleteById("users", id))
    res.redirect("/users")
  } catch (err) {
    console.log(err)
    next(err)
  }
}
