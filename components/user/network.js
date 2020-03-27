// here all will be related to http protocol

const router = require('express').Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', function(req, res) {

  if(req.session.user) {
    controller
    .listUsers()
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, error, 500, "Something is grown with the data listed")
    })
  } else {
    response.error(req, res, "Ups!, You don't access to this zone", 500)
  }

})

router.get('/authentication', function(req, res) {
  
})

router.get('/login', function(req, res) {

})

router.post('/', function(req, res) {

  req.session.user = req.user

  controller.addUser(req.body.user)
    .then(() => {
      response.success(req, res, 'Created correctly', 200)
    }).catch((error) => {
      console.log(error)
      response.error(req, res, 'Informacion valida', 400)
    })
})

module.exports = router
