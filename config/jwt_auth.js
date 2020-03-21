const router = require('express').Router()
require('dotenv').config()

const {
  TOKEN_KEY,
} = process.env

const protectedRoutes = (jwt) => {

  router.use((req, res, next) => {
    const token = req.headers['access-token']

    if (token) {
      jwt.verify(token, TOKEN_KEY, (error, decoded) => {
        if (error) {
          throw error
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      res.send({
        message: '[jwt] Token doesn\'t provided',
      })
    }
  })

  return router
}

module.exports = { protectedRoutes }

