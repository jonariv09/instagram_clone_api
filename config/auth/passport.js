const LocalStraegy = require('passport-local').Strategy

const User = require('../../components/user/model')

module.exports = function (passport) {
  passport.SerializeUser((user, done) => {
    done(null, user, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })

  passport.use(
    'local-signup',
    new LocalStraegy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(function () {
          User.findOne({ 'local.username': email }, (err, user) => {
            if (err) {
              return done(err)
            }
            // if user is found this means that can't be taken by other user
            if (user) {
              return done(null, false, req.flash('signupMessage', 'error'))
            }

            if (!req.user) {
              const newUser = new User()
              newUser.local.username = email
              newUser.local.password = user.generateHash(password)

              newUser.save((err) => {
                if (err) {
                  throw err
                  return done(
                    null,
                    newUser,
                    req.flash('signupMessage', 'success')
                  )
                }
              })
            } else {
              const newUser = req.user
              newUser.local.username = email
              newUser.local.password = user.generateHash(password)

              newUser.save((error) => {
                if (error) throw error
                return done(
                  null,
                  newUser,
                  req.flash('signupMessage', 'success')
                )
              })
            }
          })
        })
      }
    )
  )
}
