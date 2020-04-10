const router = require('express').Router()

module.exports = function (passport) {
  router.get(
    '/',
    passport.authorize('facebook', {
      scope: ['email', 'user_photos', 'user_gender', 'user_link'],
    })
  )

  router.get(
    '/callback',
    passport.authenticate('facebook', {
      successRedirect: '',
      failureRedirect: '',
    })
  )

  return router
}
