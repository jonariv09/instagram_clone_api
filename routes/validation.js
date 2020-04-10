function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/sign-in')
}

modules.exports = {
  isLoggedIn,
}
