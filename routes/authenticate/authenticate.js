const router = require('express').Router()
require('dotenv').config()
const controller = require('../../network/response')
const { validateAuthentication } = require('../../db/interface_connection')

const { TOKEN_KEY } = process.env

module.exports = (jwt) => {
  router.post('/', (req, res) => {
    validateAuthentication(req.body.user_name, req.body.password)
      .then((userFound) => {
        if (userFound) {
          const token = jwt.sign({ check: true }, TOKEN_KEY, {
            expiresIn: 1440,
          })

          controller.success(
            req,
            res,
            {
              message: 'Correct authentication',
              token: token,
            },
            200
          )
        } else {
          controller.error(req, res, error, 500, '[jwt] User not found')
        }
      })
      .catch((error) => {
        controller.error(
          req,
          res,
          error,
          500,
          '[jwt] Fatal error while jwt validation'
        )
      })
  })

  return router
}
