exports.renderSignupPage = async(req, res, next) => {
  res.render("signup_page")
}

exports.getUsers = async(req, res, next) => {
  console.log(req.body)
  res.redirect("/users")
}

exports.signupUser = async(req, res, next) => {
  console.log(req.body)
  res.redirect("/users")
}
