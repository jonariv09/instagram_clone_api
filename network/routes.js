const userRouter = require('../components/user/network')
const authenticateRouter = require('../routes/authenticate/authenticate')
const { protectedRoutes } = require('../config/jwt/jwt_auth')
const { DBConnection } = require('../db/db')

DBConnection.createConnection().then((conn) => DBConnection.setInstance(conn))

const routes = (server, jwt) => {
  server.use('/authenticate', authenticateRouter(jwt))
  server.use('/user', userRouter)
}

module.exports = routes
