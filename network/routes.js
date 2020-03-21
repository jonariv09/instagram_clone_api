const userRouter = require('../components/user/network')
const authenticateRouter = require('../routes/authenticate/authenticate')
const { protectedRoutes } = require('../config/jwt_auth')

const routes = (server, jwt) => {
  server.use('/authenticate', authenticateRouter(jwt))
  server.use('/user', protectedRoutes(jwt), userRouter)
}

module.exports = routes
