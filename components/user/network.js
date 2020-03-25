// here will be all related to http protocol

const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', function(req, res) {
  controller
    .listUsers()
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, error, 500, "Something is grown with the data listed")
    })
})

router.post('/', function(req, res) {

  controller.addUser(req.body.user)
    .then(() => {
      response.success(req, res, 'Created correctly', 200)
    }).catch((error) => {
      console.log(error)
      response.error(req, res, 'Informacion valida', 400)
    })
})

module.exports = router
