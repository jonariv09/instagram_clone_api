const router = require('express').Router()
const controller = require('../../network/response')
const { validateAuthentication } = require('../../db/interface')

const {
  TOKEN_KEY
} = process.env

module.exports = (jwt) => {

  router.post('/', (req, res) => {

    validateAuthentication(req.body.user_name, req.body.password)
      .then(userFound => {
        if(userFound) {
          const token = jwt.sign({ check: true }, TOKEN_KEY, {
            expiresIn: 1440
          })
          controller.success(req, res, "[jwt] TOKEN_KEY successfully validated", 200)
        } else {
          controller.error(req, res, error, 500, "[jwt] User not found")
        }
      })
      .catch(error => {
        controller.error(req, res, error, 500, "[jwt] Fatal error while validation")
      })

    res.send('[authenticate_route][post] Valid request')
  })

  return router
}
