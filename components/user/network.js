// here will be all related to http protocol

const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', function(req, res) {

  res.send('[user_network] from get')

  // res.send('[user_component] from get')
  // controller.addUser(req.body.user)
  //   .then(data => {
  //
  // })
})

router.post('/', function(req, res) {

  // Validation line
  // res.send('[user_network] from post')

  controller.addUser(req.body.user)
    .then(() => {
      response.success(req, res, 'Created correctly', 200)
    }).catch((error) => {
      console.log(error)
      response.error(req, res, 'Informacion valida', 400)
    })
})

module.exports = router
