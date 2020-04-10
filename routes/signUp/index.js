const router = require('express').Router()

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.send({ message: req.flash('signunpMessage') })
  })

  router.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '',
      failureRedirect: '',
      failureFlash: true,
    })
  )
}

module.exports = router
