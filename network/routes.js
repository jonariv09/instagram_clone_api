const userRouter = require('../components/user/network')
const authenticateRouter = require('../routes/authenticate/authenticate')
const { protectedRoutes } = require('../config/jwt/jwt_auth')

const routes = (server, jwt) => {
  server.use('/authenticate', authenticateRouter(jwt))
  server.use('/user', userRouter)
}

module.exports = routes
