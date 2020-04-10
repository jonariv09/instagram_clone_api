const userRouter = require('../components/user/network')
const authenticateRouter = require('./authenticate/authenticate')
const { protectedRoutes } = require('../config/jwt/jwt_auth')
const signInFacebookRouter = require('./oauth/facebook-route')

const routes = (server, jwt, passport) => {
  // server.use('/sign-up', authenticateRouter(jwt))
  // server.use('/sign-up', userRouter)
  server.use('/sign-in/facebook/', signInFacebookRouter(passport))

  server.get('/logout', function (req, res) {
    req.logout()
    res.send('Logged out from your account')
  })
}

module.exports = routes
