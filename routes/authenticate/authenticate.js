const router = require('express').Router()
const { validateAuthentication } = require('../../db/interface')

module.exports = (jwt) => {

  router.post('/', (req, res) => {

    // if(validateAuthentication()) {
    //
    // }

    validateAuthentication()
  })

}

