require('dotenv').config()
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../../components/user/model')

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env

module.exports = function (passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:3000/sign-in/facebook/callback',
        profileFields: [
          'emails',
          'displayName',
          'name',
          'photos',
          'gender',
          'profileUsers',
        ],
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        process.nextTick(() => {
          if (!req.user) {
            User.findOne({ 'facebook.id': profile.id }, (err, user) => {
              if (err) done(err)
              if (user) return done(null, user)
              else {
                const newUser = new User({
                  'facebook.id': profile.id,
                  'facebook.token': profile.token,
                  'facebook.name': profile.name,
                  'facebook.email': profile.email[0].value,
                })

                newUser.save(function (err) {
                  if (err) throw err
                  return done(null, newUser)
                })
              }
            })
          } else {
            const user = req.user
            user.facebook.id = profile.id
            user.facebook.token = profile.token
            user.facebook.name = profile.name
            user.facebook.email = profile.email[0].value

            user.save(function (err) {
              if (err) throw err
              return done(null, user)
            })
          }
        })
      }
    )
  )
}
